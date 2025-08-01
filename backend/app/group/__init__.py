from urllib import request

from flask import jsonify
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
    @ns_group.marshal_with(group_model)
    def get(self):
        gid = parser.parse_args().get('id')
        if not gid:
            return "요청한 그룹을 찾을 수 없습니다", 404

        with driver.session() as neo_session:
            results = neo_session.run("""
                MATCH (p:Person)-[r]->(g:Group {gid: $gid})
                return p, r, g
            """, gid=gid)
            response = dict(results.single()['g'])

            results = neo_session.run("""
                            MATCH (p:Person)-[r]->(g:Group {gid: $gid})
                            return p, r, g
                        """, gid=gid)
            response["members"] = [dict(record['p']) for record in results]
            return jsonify(response)

delegateModel = ns_group.model('리더 위임 모델', {
    'new_leader': fields.String(description="새 리더의 닉네임")
})

@ns_group.route('/delegate-leader')
class DelegateLeader(Resource):
    @ns_group.expect(parser, delegateModel)
    def update(self):
        gid = parser.parse_args().get('id')
        new_leader = request.get_json()['new_leader']
        user_info = request.get_json()['user_data']

        with driver.session() as neo_session:
            neo_session.run("""
                MATCH (p:Person {id:$id, sns:$sns})-[leader]->(g:Group {gid: $gid})
                MATCH (new_leader: Person {nickname: $new_leader})-[member]->(g:Group {gid: $gid})
                DELETE leader, member
                CREATE (p)-[r:Member]->(g)
                CREATE (p)-[r:Leader]->(new_leader)
            """, id=user_info['id'], sns=user_info['sns'], gid=gid,
            new_leader=new_leader)