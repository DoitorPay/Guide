from flask import request, redirect, session, jsonify
from flask_restx import Resource, fields

import math

from app.user import ns_user
from app.DB.NeoDriver import driver

def TotalExp2Level(total_exp):
    level = int((math.sqrt(total_exp*4+225) - 5) // 10)
    exp_req = 25*(level**2) + 25*level - 50
    print(exp_req)
    return (level, total_exp-exp_req)


@ns_user.route('/level', methods=['GET'])
class LevelResource(Resource):
    @ns_user.response(200, '레벨 반환 성공')
    @ns_user.response(403, '사용자 확인이 불가능해 접근 차단')
    def get(self):
        user_info = session.get('user_data')

        with driver.session() as neo_session:
            result = neo_session.run('''
                MATCH(p:Person {id:$id, sns:$sns}) return p
                ''', id=user_info['id'], sns=user_info['sns']
            )
            result = [p["p"] for p in result]

            if len(result) != 1:
                return "사용자 정보를 확인할 수 없습니다", 403

            result = neo_session.run('''
                MATCH(p:Person {id:$id, sns:$sns}) return p.total_xp as total_xp
                ''', id=user_info['id'], sns=user_info['sns']
            )
            result = [p["total_xp"] for p in result]
            level, exp = TotalExp2Level(result[0])
            print(level, exp)
            return {"level": level,
                    "exp": exp if exp > 0 else 0}, 200