from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
from flask_cors import CORS
from neo4j import GraphDatabase

import os
from dotenv import load_dotenv

app = Flask(__name__)
api = Api(app, version='1.0', title='딱!대 API',
          description='딱!대 api')
CORS(app, origins=["http://localhost:5173"])
load_dotenv()

# neo4j 연결 설정
NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USER = os.getenv("NEO4J_USERNAME")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")
print(NEO4J_URI)
driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

# 네임스페이스 정의
ns = api.namespace('', description='인증 관련 API')

# 요청/응답 모델 정의
login_model = api.model('Login', {
    'username': fields.String(required=True, description='사용자 ID'),
    'password': fields.String(required=True, description='비밀번호')
})

@ns.route('/login')
class Login(Resource):
    @ns.expect(login_model)
    def post(self):
        """로그인 요청"""
        data = api.payload
        with driver.session() as session:
            result = session.run("""
                                        MATCH (n {id: $id, password: $password})
                                        RETURN n""",
                                 id=data['username'], password=data['password'])
            return jsonify({"success": result.single() is not None})

if __name__ == "__main__":
    app.run(debug=True, port=8000)