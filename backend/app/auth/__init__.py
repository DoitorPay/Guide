from flask_restx import Namespace

ns_auth = Namespace('auth', description='Authentication related operations')

from . import AdditionalRegister