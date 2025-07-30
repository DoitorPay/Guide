from flask import jsonify
from flask_restx import Namespace, Resource, reqparse, fields

from app.DB.NeoDriver import driver

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
    "members": fields.List(fields.ClassName)
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