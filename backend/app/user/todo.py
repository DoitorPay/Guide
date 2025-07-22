import copy

from flask import request, redirect, session, jsonify
from flask_restx import Resource, fields
import uuid

from app.DB.NeoDriver import driver
from app.user import ns_user

todo_model = ns_user.model('todo list', {
    'list': fields.List(
        fields.String(),
        required=True,
        description='유저 투두 리스트'
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
                todo = [{"item": i.split("///")[0], "id": i.split("///")[1], "done": i.split("///")[2]}
                        for i in todo[0]]

            return jsonify({'todo': todo})


    @ns_user.expect(todo_model)
    @ns_user.response(200, '투두리스트 추가 성공')
    @ns_user.response(500, 'DB 내부 에러 발생')
    def post(self):
        user_data = session.get('user_data')
        item = request.get_json()['list']

        with driver.session() as neo_session:
            todo_list = neo_session.run('''
                MATCH(n:Person {id:$id}) WHERE n.sns = $sns
                 RETURN n.todo''',
                id=user_data['id'], sns=user_data['sns']
            ).value()
            if len(todo_list) != 1:
                return "사용자 정보를 확인할 수 없습니다", 500

            if todo_list[0] is not None:
                if item[0] in [todo.split("///")[0] for todo in todo_list[0] if todo is not None]:
                    return 200

            item = [f"{i}///{str(uuid.uuid4())}///false" for i in item]
            try:
                result = neo_session.run(
                    '''MATCH(n:Person {id:$id, sns: $sns})
                    WITH n, COALESCE(n.todo, []) + $todo AS combinedTodo
                    UNWIND combinedTodo AS todo
                    WITH n, COLLECT(DISTINCT todo) AS uniqueTodo
                    SET n.todo = uniqueTodo
                    RETURN n''',
                    id=user_data['id'], sns=user_data['sns'], todo=item
                )
            except Exception as e:
                return str(e), 500

    def put(self):
        user_data = session.get('user_data')
        update_item = request.get_json()['list']

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
                    item, id, done = x.split("///")
                    if id == update_item["id"]:
                        item = update_item["item"]
                        done = update_item["done"]
                        updated_list[idx] = f"{item}///{id}///{done}"
                        break

            try:
                result = neo_session.run(
                    '''MATCH(n:Person {id:$id, sns: $sns})
                    SET n.todo = $todo
                    RETURN n''',
                    id=user_data['id'], sns=user_data['sns'], todo=updated_list
                )
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
                    item, id, done = x.split("///")
                    if id == delete_item["id"]:
                        del deleted_list[idx]

            try:
                result = neo_session.run(
                    '''MATCH(n:Person {id:$id, sns: $sns})
                    SET n.todo = $todo
                    RETURN n''',
                    id=user_data['id'], sns=user_data['sns'], todo=deleted_list
                )
            except Exception as e:
                return str(e), 500