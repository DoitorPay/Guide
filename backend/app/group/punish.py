from flask_restx import Resource, fields
from flask import request, session

import random

from app.DB.NeoDriver import driver
from app.group import ns_group, parser

groupPunishModel = ns_group.model("그룹 벌칙 리스트", {
    "punish_list" : fields.List(fields.String)
})

@ns_group.route('/create-punishList')
class PunishList(Resource):
    @ns_group.expect(parser, groupPunishModel)
    @ns_group.response(200, '성공: 벌칙 리스트 생성 성공')
    @ns_group.response(404, '그룹 정보 확인 실패')
    @ns_group.response(403, '사용자 인증 실패')
    def post(self):
        gid = parser.parse_args().get('id')
        if not gid:
            return "요청한 그룹을 찾을 수 없습니다", 404

        user_info = session.get('user_data')
        if not user_info:
            return "사용자 정보를 확인할 수 없습니다", 403

        punish_list = request.get_json()['punish_list']

        with driver.session() as neo_session:
            results = neo_session.run("""
                MATCH (p:Person {sns:$sns, id:$id})-[r:Leader]->(g:Group {gid: $gid})
                SET g.punish = $punish_list
                RETURN g
            """,
            sns=user_info['sns'], id=user_info['id'],gid=gid, punish_list=punish_list)

@ns_group.route('/punish-select')
class PunishSelect(Resource):
    @ns_group.expect(parser)
    @ns_group.response(200, '성공: 선택된 벌칙 문자열')
    def get(self):
        user_info = session.get('user_data')

        gid = parser.parse_args().get('id')
        if not gid:
            return "요청한 그룹을 찾을 수 없습니다", 404

        with driver.session() as neo_session:
            results = neo_session.run("""
                MATCH (g:Group {gid: $gid})
                return g
            """, gid=gid)
            punish = list(dict(results.single()['g'])['punish'])
            punish_selected = random.choice(punish)

            neo_session.run("""
                MATCH(p:Person {id:$id, sns:$sns})
                SET p.punish = COALESCE(p.punish, []) + $punish
            """, id=user_info['id'], sns=user_info['sns'], punish=punish_selected)

            return punish_selected