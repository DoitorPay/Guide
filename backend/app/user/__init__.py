from flask_restx import Namespace, Resource, fields
from flask import request, redirect, session, jsonify

from app.DB.NeoDriver import driver

ns_user = Namespace('user', description='User Information')

user_model = ns_user.model('Member', {
    'id': fields.Integer(description='회원 고유 ID', example=123),
    'email': fields.String(description='이메일 주소', example='sample@example.com'),
    'birthdate': fields.String(description='생년월일', example='20030416'),
    'gender': fields.String(description='성별', example='남성'),
    'quote': fields.String(description='상태메시지', example='오늘도 화이팅~^^'),
    'todo':fields.List(
        fields.String,
        description="할일 목록"
    ),
    'interest': fields.List(
        fields.String,
        description='관심사 목록',
        example=['코딩', '토플']
    ),
    'total_xp': fields.Integer(description='총 경험치')
})


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
                MATCH(p: Person {sns:$sns, id:$id}) RETURN p
            """, sns=user_data['sns'], id=user_data['id'])
            response = [dict(p["p"]) for p in result]

            if len(response) != 1:
                return "사용자를 확인할 수 없습니다", 500

            return jsonify(response)

@ns_user.route('/group-participating')
class ParticipatingGroups(Resource):
    def get(self):
        user_data = session['user_data']

        response = {}
        with driver.session() as neo_session:
            result = neo_session.run("""
                MATCH(p: Person {sns:$sns, id:$id})-[r:Member]->(g:Group)
                RETURN p,r,g
            """, sns=user_data['sns'], id=user_data['id'])
            response['member'] = [dict(record["g"]) for record in result]

            result = neo_session.run("""
                            MATCH(p: Person {sns:$sns, id:$id})-[r:Leader]->(g:Group)
                            RETURN p,r,g
                        """, sns=user_data['sns'], id=user_data['id'])
            response['leader'] = [dict(record["g"]) for record in result]

            return jsonify(response)