from flask_restx import Namespace
from flask_restx import Resource
from flask import session

ns_auth = Namespace('auth', description='Authentication related operations')

@ns_auth.route('/logout')
class Logout(Resource):
    def get(self):
        """세션 로그아웃"""
        session.pop('user_data', None)
        return {'message': '로그아웃 완료'}, 200