from app import app
from flask import jsonify, request
from app.apis import insert_data_info
import os

@app.route("/", methods=["POST"])
def insert_data():
    return insert_data_info(request.json)

@app.route("/", methods=["GET"])
def home():
    return "Welcome to HTML tag annotator"

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
