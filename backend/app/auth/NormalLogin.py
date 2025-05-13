from flask import jsonify, request
from flask_restx import Resource, fields, Namespace

from app.DB.NeoDriver import driver
from app.auth import ns_auth


# 요청/응답 모델 정의
login_model = ns_auth.model('Login', {
    'username': fields.String(required=True, description='사용자 ID'),
    'password': fields.String(required=True, description='비밀번호')
})

@ns_auth.route('/normal/login')
class Login(Resource):
    @ns_auth.expect(login_model)
    def post(self):
        """로그인 요청"""
        data = request.get_json()
        with driver.session() as session:
            result = session.run("""
                                        MATCH (n {id: $id, password: $password})
                                        RETURN n""",
                                 id=data['username'], password=data['password'])
            return jsonify({"success": result.single() is not None})