from flask_restx import Namespace, Resource

from app.DB.NeoDriver import driver

ns_group = Namespace('group')

class Group(Resource):
    def get(self):
        pass