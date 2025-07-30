from flask_restx import Namespace
from flask_restx import Resource
from flask import session

from app.DB.NeoDriver import driver

ns_auth = Namespace('auth', description='Authentication related operations')

@ns_auth.route('/check-login')
class Logout(Resource):
    def get(self):
        user_info = session.get('user_data')

        with driver.session() as neo_session:
            result = neo_session.run(
                '''
                    MATCH(p:Person {id:$id, sns:$sns}) return p
                ''',
                id = user_info['id'], sns = user_info['sns']
            )
            result = [dict(record['p']) for record in result]
            print(result)

            return len(result) == 1

@ns_auth.route('/logout')
class Logout(Resource):
    def get(self):
        """세션 로그아웃"""
        session.pop('user_data', None)
        return {'message': '로그아웃 완료'}, 200