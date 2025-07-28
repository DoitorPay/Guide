from flask_restx import Namespace, Resource, reqparse

from app.DB.NeoDriver import driver

ns_group = Namespace('group')

parser = reqparse.RequestParser()

parser.add_argument('id', type=str,
                    help='그룹 id')
parser.add_argument('req', type=str,
                    help='요청할 그룹 프로퍼티. 여러개일경우 언더바로 구분 (예: name_topic)')

class Group(Resource):
    @ns_group.expect(parser)
    def get(self):
        args = parser.parse_args().get('req')

        if args:
            args = args.split('_')
