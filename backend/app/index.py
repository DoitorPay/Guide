from flask import Flask, send_from_directory
from flask_restx import Api, Resource
from flask_cors import CORS

import app.auth.KakaoLogin as KakaoLogin
import app.auth.NaverLogin as NaverLogin
import app.auth.UserForm as UserForm
from app.auth import ns_auth

import app.user.todo as todo
import app.user.UserInterest as UserInterest
import app.user.punishFeed as PunishFeed
import app.user.level as level
from app.user import ns_user

import app.group.create as create
import app.group.punish as punish
import app.group.todo as todo
from app.group import ns_group

import os
from dotenv import load_dotenv
load_dotenv()
server = Flask("딱!대",
               static_folder='../dist',
               template_folder='../dist',)
server.secret_key = os.getenv('APP_SECRET_KEY')
api = Api(server, version='1.0', title='딱!대 API',
          description='딱!대 api')
CORS(server, origins=["http://localhost:5175"])

api.add_namespace(ns_auth)
api.add_namespace(ns_user, path='/api/user')
api.add_namespace(ns_group, path='/api/group')

@api.route('/', defaults={'path': ''})
@api.route('/<path:path>')
class SPA(Resource):
    def get(self, path):
        full_path = os.path.join(server.static_folder, path)
        # 실제 파일 요청이면 그대로 서빙
        if path and os.path.isfile(full_path):
            return send_from_directory(server.static_folder, path)
        # 그 외는 index.html 반환
        return send_from_directory(server.template_folder, 'index.html')

if __name__ == "__main__":
    server.run(debug=True, port=8000)