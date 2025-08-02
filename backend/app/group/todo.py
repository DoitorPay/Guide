from flask_restx import Resource, fields
from flask import request, session

import uuid
import copy

from app.DB.NeoDriver import driver
from app.group import ns_group, parser

todo_model = ns_group.model('todo list', {
    'item': fields.String(
        required=True,
        description='그룹 투두 리스트'
    )
})

todo_modify_model = ns_group.model('todo list', {
    'item': fields.String(
        required=True,
        description='그룹 투두 리스트'
    ),
    'id': fields.String(
        required=True,
        description='투두 아이템 항목 아이디'
    ),
    'done': fields.String(
        required=True,
        description='완료 여부'
    )
})

@ns_group.route('/todo')
class Todo(Resource):
    @ns_group.expect(parser, todo_model)
    def post(self):
        gid = request.args.get('id')
        new_item = request.get_json()

        with driver.session() as neo_session:
            result = neo_session.run("""
                MATCH (g:Group {gid:$gid}) RETURN g.todo as todo
            """, gid=gid)

            todo_list = [dict(todo)['todo'] for todo in result]
            for item in todo_list:
                if new_item in item.split("///"):
                    return 200

            todo_list.append(f"{item}///{str(uuid.uuid4())}///false")

            try:
                 neo_session.run(
                    '''MATCH(n:Group {gid:$gid})
                    SET n.todo = $todo
                    RETURN n''',
                    gid=gid, todo=todo_list
                )
                 return 200
            except Exception as e:
                return str(e), 500

    @ns_group.expect(parser, todo_modify_model)
    def put(self):
        gid = request.args.get('id')
        update_item = request.get_json()['item']

        with driver.session() as neo_session:
            todo_list = neo_session.run('''
                MATCH (g:Group {gid:$gid})
                RETURN g.todo as todo''',
                gid = gid)
            todo_list = [dict(todo)['todo'] for todo in todo_list]

            updated_list = copy.deepcopy(todo_list)
            if todo_list is not None:
                for idx, x in enumerate(todo_list):
                    item, id, done = x.split("///")
                    if id == update_item["id"]:
                        item = update_item["item"]
                        done = update_item["done"]
                        updated_list[idx] = f"{item}///{id}///{done}"
                        break

            try:
                neo_session.run(
                    '''MATCH(n:Group {gid: $gid})
                    SET n.todo = $todo
                    RETURN n''',
                    gid = gid, todo=updated_list)
                return 200
            except Exception as e:
                return str(e), 500

    @ns_group.expect(parser, todo_modify_model)
    def delete(self):
        gid = request.args.get('id')
        delete_item = request.get_json()

        with driver.session() as neo_session:
            todo_list = neo_session.run('''
                MATCH(n:Group {gid:$gid})
                RETURN n.todo''', gid = gid)

            deleted_list = copy.deepcopy(todo_list)
            if todo_list is not None:
                for idx, x in enumerate(todo_list):
                    item, id, done = x.split("///")
                    if id == delete_item["id"]:
                        del deleted_list[idx]

            try:
                neo_session.run(
                    '''MATCH(n:Group {gid: $gid})
                    SET n.todo = $todo
                    RETURN n''',
                    gid=gid, todo=deleted_list)
                return 200
            except Exception as e:
                return str(e), 500