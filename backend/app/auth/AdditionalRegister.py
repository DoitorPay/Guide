from flask_restx import Resource
from flask import redirect
from app.auth import ns_auth  # ✅ 여기서 ns_auth 네임스페이스 가져와야 함

@ns_auth.route('/additReister')  # ✅ URL: /auth/additReister
class AdditReister(Resource):
    def get(self):
        return redirect("http://localhost:5173/social-callback?id=1234&sns=kakao&registered=false")
