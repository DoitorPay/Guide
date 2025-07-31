import copy

from flask import request, redirect, session, jsonify
from flask_restx import Resource, fields
import uuid

from app.DB.NeoDriver import driver
from app.user import ns_user

todo_model = ns_user.model('todo list', {
    'item': fields.String(
        required=True,
        description='유저 투두 리스트'
    ),
    'exec_date': fields.DateTime(
        required=True,
        description='미션을 수행해야할 날짜'
    )
})

@ns_user.route('/user-todo')
class UserTodo(Resource):
    def get(self):
        user_data = session.get('user_data')
        with driver.session() as neo_session:
            todo = neo_session.run('''
                MATCH(n:Person {id:$id, sns:$sns}) 
                RETURN n.todo
            ''', id=user_data['id'], sns=user_data['sns']
            ).value()
            if len(todo) != 1:
                return "사용자 정보를 확인할 수 없습니다", 500

            if todo[0] is not None:
                todo = [{"item": i.split("///")[0], "exec_date": i.split("///")[1], "id": i.split("///")[2], "done": i.split("///")[3]}
                        for i in todo[0]]

            return jsonify({'todo': todo})


    @ns_user.expect(todo_model)
    @ns_user.response(200, '투두리스트 추가 성공')
    @ns_user.response(500, 'DB 내부 에러 발생')
    def post(self):
        user_data = session.get('user_data')
        item = request.get_json()['item']
        exec_date = request.get_json()['exec_date']

        with driver.session() as neo_session:
            todo_list = neo_session.run('''
                MATCH(n:Person {id:$id}) WHERE n.sns = $sns
                 RETURN n.todo as todo''',
                id=user_data['id'], sns=user_data['sns']
            )
            todo_list = [dict(todo)['todo'] for todo in todo_list]

            if len(todo_list) != 1:
                return "사용자 정보를 확인할 수 없습니다", 500

            todo_list = todo_list[0] if todo_list[0] is not None else []
            for todo in todo_list:
                if item in todo.split("///"):
                    return 200

            todo_list.append(f"{item}///{exec_date}///{str(uuid.uuid4())}///false")
            try:
                 neo_session.run(
                    '''MATCH(n:Person {id:$id, sns: $sns})
                    SET n.todo = $todo
                    RETURN n''',
                    id=user_data['id'], sns=user_data['sns'], todo=list(todo_list)
                )
                 return 200
            except Exception as e:
                return str(e), 500

    def put(self):
        user_data = session.get('user_data')
        update_item = request.get_json()['item']

        with driver.session() as neo_session:
            todo_list = neo_session.run('''
                MATCH(n:Person {id:$id}) WHERE n.sns = $sns
                RETURN n.todo''',
                id=user_data['id'], sns=user_data['sns']
            ).value()
            if len(todo_list) != 1:
                return "사용자 정보를 확인할 수 없습니다", 500

            updated_list = copy.deepcopy(todo_list[0])
            if todo_list[0] is not None:
                for idx, x in enumerate(todo_list[0]):
                    item, exec_date, id, done = x.split("///")
                    if id == update_item["id"]:
                        item = update_item["item"]
                        done = update_item["done"]
                        exec_date = update_item["exec_date"]
                        updated_list[idx] = f"{item}///{exec_date}///{id}///{done}"
                        break

            try:
                neo_session.run(
                    '''MATCH(n:Person {id:$id, sns: $sns})
                    SET n.todo = $todo
                    RETURN n''',
                    id=user_data['id'], sns=user_data['sns'], todo=updated_list
                )
                return 200
            except Exception as e:
                return str(e), 500

    def delete(self):
        user_data = session.get('user_data')
        delete_item = request.get_json()['list']

        with driver.session() as neo_session:
            todo_list = neo_session.run('''
                        MATCH(n:Person {id:$id}) WHERE n.sns = $sns
                        RETURN n.todo''',
                                        id=user_data['id'], sns=user_data['sns']
                                        ).value()
            if len(todo_list) != 1:
                return "사용자 정보를 확인할 수 없습니다", 500

            deleted_list = copy.deepcopy(todo_list[0])
            if todo_list[0] is not None:
                for idx, x in enumerate(todo_list[0]):
                    item, exec_date, id, done = x.split("///")
                    if id == delete_item["id"]:
                        del deleted_list[idx]

            try:
                neo_session.run(
                    '''MATCH(n:Person {id:$id, sns: $sns})
                    SET n.todo = $todo
                    RETURN n''',
                    id=user_data['id'], sns=user_data['sns'], todo=deleted_list
                )
                return 200
            except Exception as e:
                return str(e), 500