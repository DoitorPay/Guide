from flask import Flask, request, jsonify
from flask_cors import CORS
from neo4j import GraphDatabase

import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
load_dotenv()

# neo4j 연결 설정
NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USER = os.getenv("NEO4J_USERNAME")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")
print(NEO4J_URI)
driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

@app.route('/', methods=['GET'])
def home():
    return "Hello World"

@app.route('/login', methods=['post'])
def LoginRequest():
    user_request = request.get_json()
    id = user_request.get('id')
    password = user_request.get('password')

    with driver.session() as session:
        result = session.run("""
                            MATCH (n {id: $id, password: $password})
                            RETURN n""", 
                            id=id, password=password)
        return True if result.single() else False

if __name__ == "__main__":
    app.run(debug=True, port=8000)