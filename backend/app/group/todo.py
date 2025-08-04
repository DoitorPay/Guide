from flask_restx import Resource, fields
from flask import request, session, jsonify

import uuid
import copy
import json

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
    @ns_group.expect(parser)
    def get(self):
        gid = request.args.get('id')
        with driver.session() as neo_session:
            todo = neo_session.run('''
                MATCH (g:Group {gid:$gid}) RETURN g.todo as todo
            ''', gid=gid).value()
            todo = json.loads(todo[0].replace("'", '"'))
            print(todo)
            return jsonify(todo)

    @ns_group.expect(parser, todo_model)
    def post(self):
        gid = request.args.get('id')
        new_item = request.get_json()

        with driver.session() as neo_session:
            result = neo_session.run("""
                MATCH (g:Group {gid:$gid}) RETURN g
            """, gid=gid).value()

            if len(result) != 1:
                return "그룹을 찾을 수 없습니다", 404
            try:
                 neo_session.run(
                    '''MATCH(n:Group {gid:$gid})
                    SET n.todo = $todo
                    RETURN n''',
                    gid=gid, todo=str(new_item)
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
                gid = gid).value()[0]
            todo = json.loads(todo_list.replace("'", '"'))
            for item in todo:
                if item["id"] == update_item["id"]:
                    item['id'] = update_item['id']
                    item['item'] = update_item['item']
                    item['done'] = update_item['done']

            try:
                neo_session.run(
                    '''MATCH(n:Group {gid: $gid})
                    SET n.todo = $todo
                    RETURN n''',
                    gid = gid, todo=str(todo))
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