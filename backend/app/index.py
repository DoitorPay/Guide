from flask import Flask
from flask_restx import Api
from flask_cors import CORS


import app.auth.NormalLogin as NormalLogin
import app.auth.NaverLogin as NaverLogin
import app.auth.KakaoLogin as KakaoLogin

import os
from dotenv import load_dotenv
load_dotenv()
server = Flask(__name__)
server.secret_key = os.getenv('APP_SECRET_KEY')
api = Api(server, version='1.0', title='딱!대 API',
          description='딱!대 api')
CORS(server, origins=["http://localhost:5173"])

api.add_namespace(NormalLogin.ns)
api.add_namespace(NaverLogin.NaverNamespace)
api.add_namespace(KakaoLogin.KakaoNamespace)

if __name__ == "__main__":
    server.run(debug=True, port=8000)