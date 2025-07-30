from flask_restx import Namespace, Resource
from flask import request, redirect, session, jsonify

from app.DB.NeoDriver import driver

ns_user = Namespace('user', description='User Information')

@ns_user.route('/nickname')
class NickName(Resource):
    def get(self):
        with driver.session() as neo_session:
            result = neo_session.run("""
                MATCH(n {sns: $sns, id: $id}) RETURN n.nickname
            """, sns = session['user_data']['sns'], id = session['user_data']['id'])
            print(result)
            return jsonify({'profile': result.single()[0]})

@ns_user.route('/profile_img')
class Profile(Resource):
    def get(self):
        user_data = session['user_data']
        return jsonify({'profile': user_data['profile']})

@ns_user.route('/user_properties')
class UserProperties(Resource):
    def get(self):
        user_data = session['user_data']

        with driver.session() as neo_session:
            result = neo_session.run("""
                MATCH(p: {sns=$sns, id: $id})
                RETURN p
            """,sns=user_data['sns'], id=user_data['id'])
            response = [dict(p["p"]) for p in result]

            if len(response) != 1:
                return "사용자를 확인할 수 없습니다", 500

            return jsonify(response)