from flask import request, redirect, session, jsonify
from flask_restx import Resource, fields
import requests

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
        pass

    @ns_user.expect(todo_model)
    @ns_user.response(200, '투두리스트 추가 성공')
    @ns_user.response(500, 'DB 내부 에러 발생')
    def post(self):
        user_data = session.get('user_data')
        todo_list = request.get_json()
        with driver.session() as neo_session:
            user = neo_session.run(
                '''MATCH(n:Person {id:$id}) WHERE n.sns = $sns
                 RETURN COUNT(n)''', id=user_data['id'], sns=user_data['sns']
            ).single()
            if user.value() != 1:
                return "사용자 정보를 확인할 수 없습니다", 500

            try:
                neo_session.run(
                    '''MATCH(n:Person {id:$id}) WHERE n.sns = $sns
                    WHERE n.sns = $sns
                    WITH n, COALESCE(n.interest, []) + todo_list AS combinedTodo
                    UNWIND combinedTodo AS todo
                    WITH n, COLLECT(DISTINCT todo) AS uniqueTodo
                    SET n.todo = uniqueTodo''',
                    id=user_data['id'], sns=user_data['sns'], todo=todo_list['list']
                )
            except Exception as e:
                return str(e)