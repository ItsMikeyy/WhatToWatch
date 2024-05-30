from flask import Flask, jsonify, request
from flask_cors import CORS
from scrape import Scrape



app = Flask(__name__)
CORS(app)
s = Scrape()

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/submit', methods=["POST"])
def submit():
    data = request.get_json()
    genres = data.get("options", [])
    title_type = data.get("type", "") 
    data = s.get_show(genres, title_type)
    if not data:
        return jsonify({'message': 'Failed to find a show', 'data': data}), 500
    return jsonify({'message': 'Success', 'data': data}), 200

if __name__ == "__main__":
    app.run(debug=True)
    