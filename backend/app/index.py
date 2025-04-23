from flask import Flask
from flask_restx import Api
from flask_cors import CORS

from auth import NormalLogin, KakaoLogin

app = Flask(__name__)
api = Api(app, version='1.0', title='딱!대 API',
          description='딱!대 api')
CORS(app, origins=["http://localhost:5173"])


api.add_namespace(NormalLogin.ns)
api.add_namespace(KakaoLogin.ns)

if __name__ == "__main__":
    app.run(debug=True, port=8000)