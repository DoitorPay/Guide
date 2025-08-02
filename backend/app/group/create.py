import uuid

from flask_restx import Resource, fields
from flask import request, session

from app.DB.NeoDriver import driver
from app.group import ns_group

group_model = ns_group.model('group creation form', {
    'name': fields.String,
    'description': fields.String,
    'topic': fields.String,
    'num_goals': fields.Integer,
    'conf_date': fields.String,
    'duration': fields.Integer,
    'end_date': fields.DateTime ,
    'punish': fields.List(fields.String, example=['엉덩이맞기', '머리를 뜨극뜨극 밀기'])
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
                    n.name = $name,
                    n.description = $description,
                    n.topic = $topic,
                    n.num_goals = $num_goals,
                    n.conf_date = $conf_date,
                    n.gid = $gid,
                    n.duration = $duration,
                    n.time_created = toString(datetime()),
                    n.end_date = $end_date,
                    n.punish = $punish""",
                name=info['name'], description=info['description'], topic=info['topic'],
                num_goals=info['num_goals'], conf_date=info['conf_date'],duration=info['duration'],gid=gid,
                end_date=info['end_date'], punish=info['punish']
            )

            user_info = session['user_info']
            neo_session.run("""
                MATCH(n:Group{gid: $gid}), (n:Person{id: $id, sns: $sns})
                MERGE (a)-[r:Leader]->(b)""",
                gid=gid, id=user_info['id'], sns=user_info['sns'])

            return gid, 200