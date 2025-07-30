from flask import jsonify
from flask_restx import Namespace, Resource, reqparse

from app.DB.NeoDriver import driver

ns_group = Namespace('group')

parser = reqparse.RequestParser()

parser.add_argument('id', type=str,
                    help='그룹 id')

@ns_group.route('')
class Group(Resource):
    @ns_group.expect(parser)
    def get(self):
        gid = parser.parse_args().get('id')
        if not gid:
            return "요청한 그룹을 찾을 수 없습니다", 404

        with driver.session() as neo_session:
            results = neo_session.run("MATCH(g:Group {gid: $gid}) return g", gid=gid)
            response = []
            for record in results:
                response.append(dict(record["g"]))

            return jsonify(response)