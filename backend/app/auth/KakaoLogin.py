from flask import request, redirect, session, jsonify
from flask_restx import Resource, Namespace
import requests

import os
from dotenv import load_dotenv
load_dotenv()

from app.DB.NeoDriver import driver
from app.auth import ns_auth

REDIRECT_URI = 'http://localhost:8000/auth/kakao/callback'

@ns_auth.route('/kakao/login')
class KakaoLogin(Resource):
    def get(self):
        """카카오 로그인 시작"""
        kakao_auth_url = (
            f"http://kauth.kakao.com/oauth/authorize"
            f"?client_id={os.getenv('RESTAPI_KAKAO_KEY')}"
            f"&redirect_uri={REDIRECT_URI}"
            f"&response_type=code"
        )
        return redirect(kakao_auth_url)

@ns_auth.route('/kakao/callback')
class KakaoCallback(Resource):
    def get(self):
        """카카오 로그인 콜백 처리"""
        code = request.args.get('code')

        # 토큰 요청
        token_url = "https://kauth.kakao.com/oauth/token"
        data = {
            'grant_type': 'authorization_code',
            'client_id': os.getenv('RESTAPI_KAKAO_KEY'),
            'redirect_uri': REDIRECT_URI,
            'code': code,
        }
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}

        token_res = requests.post(token_url, data=data, headers=headers)
        token_json = token_res.json()
        access_token = token_json.get('access_token')

        # 사용자 정보 요청
        user_info_url = "https://kapi.kakao.com/v2/user/me"
        headers = {"Authorization": f"Bearer {access_token}"}
        user_res = requests.get(user_info_url, headers=headers)
        user_info = user_res.json()

        session['user_data'] = {
            'sns': 'kakao',
            'id': user_info['id'],
            'profile': user_info['properties']['profile_image'] if 'profile_image' in user_info['properties'] else ' ',
            'name': user_info['properties']['nickname'] if 'nickname' in user_info['properties'] else ' ',
        }
        with driver.session() as neo_session:
            result = neo_session.run("""MATCH (n {id: $id})
                                        WHERE n.sns = $sns
                                    RETURN n""",
                                    id=user_info["id"], sns='kakao')
            return redirect("http://localhost:8000/") if result.single()  \
                else redirect('http://localhost:8000/additRegister')

