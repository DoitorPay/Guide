from urllib import request

from flask import jsonify, session
from flask_restx import Namespace, Resource, reqparse, fields

from app.DB.NeoDriver import driver
from app.user import user_model

ns_group = Namespace('group')

parser = reqparse.RequestParser()
parser.add_argument('id', type=str,
                    help='그룹 id')

group_model = ns_group.model('Group', {
    "category": fields.String,
    "description": fields.String,
    "duration": fields.String,
    "gid": fields.String,
    "name": fields.String,
    "punish": fields.List(fields.String, example=["엉덩이로 이름쓰기", "노래부르기"]),
    "todo": fields.List(fields.String, example=["개발하기", "게임하기"]),
    "members": fields.List(fields.Nested(user_model))
})

@ns_group.route('')
class Group(Resource):
    @ns_group.expect(parser)
    def get(self):
        gid = parser.parse_args().get('id')

        with driver.session() as session:
            if gid:
                # 개별 그룹 조회
                results = session.run("""
                    MATCH (p:Person)-[r]->(g:Group {gid: $gid})
                    RETURN p, r, g
                """, gid=gid)

                group = results.single()
                if not group:
                    return "요청한 그룹을 찾을 수 없습니다", 404

                response = dict(group['g'])

                results = session.run("""
                    MATCH (p:Person)-[r]->(g:Group {gid: $gid})
                    RETURN p
                """, gid=gid)
                response["members"] = [dict(record['p']) for record in results]
                return jsonify(response)

            else:
                # gid 없으면 전체 그룹 반환
                results = session.run("""
                    MATCH (g:Group)
                    OPTIONAL MATCH (p:Person)-[:Member|Leader]->(g)
                    WITH g, collect(p) AS members
                    RETURN g, members
                """)

                response = []
                for record in results:
                    group_data = dict(record["g"])
                    group_data["members"] = [dict(m) for m in record["members"]]
                    response.append(group_data)

                return response

delegateModel = ns_group.model('리더 위임 모델', {
    'new_leader': fields.String(description="새 리더의 닉네임")
})

@ns_group.route('/delegate-leader')
class DelegateLeader(Resource):
    @ns_group.expect(parser, delegateModel)
    def update(self):
        gid = parser.parse_args().get('id')
        new_leader = request.get_json()['new_leader']
        user_info = session.get('user_data')

        with driver.session() as neo_session:
            neo_session.run("""
                MATCH (p:Person {id:$id, sns:$sns})-[leader]->(g:Group {gid: $gid})
                MATCH (new_leader: Person {nickname: $new_leader})-[member]->(g:Group {gid: $gid})
                DELETE leader, member
                CREATE (p)-[r:Member]->(g)
                CREATE (p)-[r:Leader]->(new_leader)
            """, id=user_info['id'], sns=user_info['sns'], gid=gid,
            new_leader=new_leader)

@ns_group.route('/register')
class Register(Resource):
    @ns_group.expect(parser)
    def put(self):
        gid = parser.parse_args().get('id')
        user_info = session.get('user_data')
        print(gid, user_info)
        with driver.session() as neo_session:
            neo_session.run("""
                MATCH(p:Person {id:$id, sns:$sns}), (g:Group {gid: $gid})
                MERGE (p)-[r:Member]->(g)
                return p,r,g
            """, id=user_info['id'], sns=user_info['sns'], gid=gid)
            return {'message': '가입 완료'}, 200