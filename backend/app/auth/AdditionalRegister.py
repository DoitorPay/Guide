from flask_restx import Resource

from app.DB.NeoDriver import driver
from app.auth import ns_auth

@ns_auth.route('/additReister')
class AdditReister(Resource):
    def get(self):
        return "추가 기입 화면입니모"