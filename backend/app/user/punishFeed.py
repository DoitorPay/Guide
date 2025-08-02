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

@ns_user.route('/punishFeed')
class PunishFeed(Resource):
    def get(self):
        user_data = session.get('user_data')

        with driver.session() as neo_session:
            result = neo_session.run("""
                MATCH(p:Person {sns:$sns, id:$id}) RETURN p.punish_history AS punish_history;
            """, id=user_data['id'], sns=user_data['sns']).single()

            if result['punish_history'] is None:
                return jsonify([])

            response = [{
                'punish': history.split("///")[0],
                'content': history.split("///")[1],
                'gid': history.split("///")[2],
                'exec_date': history.split("///")[3]
            } for history in result['punish_history']]
            return jsonify(response)


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
                SET p.punish_history = COALESCE(p.punish_history, []) + $content,
                p.punish = [punish IN p.punish WHERE punish <> $punish+"///"+$gid]
                RETURN p.punish_history as punish_history, p.punish as punish
            """, sns=user_data['sns'], id=user_data['id'], gid=group_id, content=formatted_content, punish=punish)

