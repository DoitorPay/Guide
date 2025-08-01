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
                    MATCH (p:Person {id: $id, sns: $sns})
                    SET p.interest = $interest
                '''
                , interest=topics['topics']
                , sns = session['user_data']['sns']
                , id=session['user_data']['id']
            )

    def get(self):
        with driver.session() as neo_session:
            res = neo_session.run(
                '''
                    MATCH (n:Person {id: $id, sns: $sns})
                    WHERE n.sns = $sns
                    return n.interest
                '''
                , sns = session['user_data']['sns']
                , id=session['user_data']['id']
            )
            return jsonify(res.single())