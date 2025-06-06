from flask import request, redirect, session, jsonify
from flask_restx import Resource, fields
import requests

from app.auth import ns_auth
from app.DB.NeoDriver import driver

query = """MERGE(n:Person{id: $id})
           ON CREATE SET 
           n.sns = $sns,
           n.nickname = $nickname,
           n.profile = $profile,
           n.birth = $birth,
           n.gender = $gender,
           n.email = $email"""

signup_model = ns_auth.model('Signup', {
    'nickname': fields.String(required=True),
    'birth': fields.String(required=True),
    'gender': fields.String(required=True),
    'email': fields.String(required=True)
})

@ns_auth.route('/signUpForm')
class UserForm(Resource):
    @ns_auth.expect(signup_model)
    def post(self):
        signupForm = request.get_json()
        print(signupForm)
        snsInfo, sns = (session['kakao_user'], "kakao") if 'kakao_user' in session \
            else (session['naver_user'], "naver")
        print(snsInfo, sns)

        with driver.session() as neo_session :
            result = neo_session.run(query,
                                     id=snsInfo["id"] if sns == "kakao" else snsInfo["response"]["id"],
                                     sns=sns,
                                     profile=snsInfo['properties']['profile_image'] if sns == "kakao" \
                                                else snsInfo['response']['profile_image'],
                                     nickname=signupForm['nickname'],
                                     birth=signupForm['birth'],
                                     gender=signupForm['gender'],
                                     email=signupForm['email'])