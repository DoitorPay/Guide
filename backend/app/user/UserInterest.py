from flask import request, redirect, session, jsonify
from flask_restx import Resource, Namespace
import requests

from app.DB.NeoDriver import driver
from app.user import ns_user

@ns_user.route('/topics')
class UpdateInterest(Resource):
    def post(self):
        topics = request.get_json()
        with driver.session() as neo_session:
            neo_session.run(
                '''
                    MATCH (n:Person {id: $id})
                    WHERE n.sns = $sns
                    WITH n, n.interest + $interest AS combinedInterests
                    UNWIND combinedInterests AS interest
                    WITH n, COLLECT(DISTINCT interest) AS uniqueInterests
                    SET n.interest = uniqueInterests
                '''
                , interest=topics['topics']
                , sns = session['user_data']['sns']
                , id=session['user_data']['id']
            )