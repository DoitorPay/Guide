from flask_restx import Resource, fields
from flask import request, session

import random

from app.DB.NeoDriver import driver
from app.group import ns_group, parser


@ns_group.route('/punish-select')
class PunishSelect(Resource):
    @ns_group.expect(parser)
    @ns_group.response(200, '성공: 선택된 벌칙 문자열')
    def get(self):
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
            return punish_selected