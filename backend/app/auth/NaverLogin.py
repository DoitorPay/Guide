from flask import request, redirect, session, jsonify
from flask_restx import Resource, Namespace
import requests
import uuid

import os
from dotenv import load_dotenv

from app.DB.NeoDriver import driver
from app.auth import ns_auth

load_dotenv()

REDIRECT_URI = 'http://localhost:8000/auth/naver/callback'

@ns_auth.route('/naver/login')
class NaverLogin(Resource):
    def get(self):
        """네이버 로그인 시작"""
        naver_login_url = (
            f"https://nid.naver.com/oauth2.0/authorize"
            f"?response_type=code&client_id={os.getenv('NAVER_API_CLIENT_ID')}"
            f"&redirect_uri={REDIRECT_URI}&state={uuid.uuid4().hex}"
        )
        return redirect(naver_login_url)

@ns_auth.route('/naver/callback')
class NaverCallback(Resource):
    def get(self):
        code = request.args.get('code')
        state = request.args.get('state')

        token_url = "https://nid.naver.com/oauth2.0/token"
        params = {
            "grant_type": "authorization_code",
            "client_id": os.getenv('NAVER_API_CLIENT_ID'),
            "client_secret": os.getenv('NAVER_API_CLIENT_SECRET'),
            "code": code,
            "state": state,
        }

        res = requests.get(token_url, params=params)
        token_data = res.json()
        access_token = token_data.get("access_token")

        headers = {"Authorization": f"Bearer {access_token}"}
        profile_res = requests.get("https://openapi.naver.com/v1/nid/me", headers=headers)
        profile_data = profile_res.json()
        print(profile_data)
        session['user_data'] = {
            'sns': 'naver',
            'id': profile_data['response']['id'],
            'profile': profile_data['response']['profile_image'] if 'profile_image' in profile_data['response'] else ' ',
            'name': profile_data['response']['name'] if 'name' in profile_data['response'] else ' ',
        }

        with driver.session() as neo_session:
            result = neo_session.run("""MATCH (n {id: $id})
                                        WHERE n.sns = $sns
                                    RETURN n""",
                                    id=profile_data["response"]["id"], sns='naver')
            return redirect("http://localhost:8000/") if result.single() \
                else redirect('http://localhost:8000/additRegister')