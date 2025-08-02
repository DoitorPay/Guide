from flask import request, redirect, session, jsonify
from flask_restx import Resource, fields
import datetime

from app.DB.NeoDriver import driver
from app.user import ns_user

punishFeedModel = ns_user.model('벌칙 인증 모델', {
    'punish': fields.String,
    'group_id': fields.String,
    'content': fields.String
})

@ns_user.route('/punishFeed', methods=['POST'])
class PunishFeed(Resource):
    @ns_user.expect(punishFeedModel)
    def post(self):
        user_data = session.get('user_data')

        req = request.get_json()
        punish = request.get_json()['punish']
        group_id = req['group_id']
        content = req['content']

        formatted_content = f"{punish}///{content}///{group_id}///{datetime.datetime.now().strftime('%Y-%m-%d')}"
        with driver.session() as neo_session:
            result = neo_session.run("""
                MATCH(p:Person {sns:$sns, id:$id})-[r]->(g:Group {gid:$gid})
                SET p.punish_history = COALESCE(p.punish_history, []) + $content
                RETURN r;
            """, sns=user_data['sns'], id=user_data['id'], gid=user_data['gid'], content=formatted_content)