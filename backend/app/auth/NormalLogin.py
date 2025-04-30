from flask import jsonify, request
from flask_restx import Api, Resource, fields, Namespace

from app.DB.NeoDriver import driver

# 네임스페이스 정의
ns = Namespace('', description='인증 관련 API')

# 요청/응답 모델 정의
login_model = ns.model('Login', {
    'username': fields.String(required=True, description='사용자 ID'),
    'password': fields.String(required=True, description='비밀번호')
})

@ns.route('/login')
class Login(Resource):
    @ns.expect(login_model)
    def post(self):
        """로그인 요청"""
        data = request.get_json()
        with driver.session() as session:
            result = session.run("""
                                        MATCH (n {id: $id, password: $password})
                                        RETURN n""",
                                 id=data['username'], password=data['password'])
            return jsonify({"success": result.single() is not None})