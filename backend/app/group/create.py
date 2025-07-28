import uuid
import datetime

from flask_restx import Resource, fields
from flask import request, redirect, session, jsonify

from app.DB.NeoDriver import driver
from app.group import ns_group

group_model = ns_group.model('group creation form', {
    'name': fields.String,
    'description': fields.String,
    'topic': fields.String,
    'num_goals': fields.Integer,
    'conf_date': fields.String,
    'duration': fields.String
})

@ns_group.route('/create')
class Create(Resource):
    @ns_group.expect(group_model)
    def post(self):
        info = request.get_json()
        gid = str(uuid.uuid4())

        with driver.session() as neo_session:
            neo_session.run("""
                MERGE(n:Group{name: $name})
                ON CREATE SET
                    n.name = name,
                    n.description = description,
                    n.topic = topic,
                    n.num_goals = num_goals,
                    n.conf_date = conf_date,
                    n.time_created = datetime(),
                    n.duration = duration,
                    n.gid = gid
            """)

            user_info = session['user_info']
            neo_session.run("""
                MATCH(n:Group{gid: $gid}), (n:Person{id: id, sns: sns})
                MERGE (a)-[r:Leader]->(b)
            """)

            return gid, 200