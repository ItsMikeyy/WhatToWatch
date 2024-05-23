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
    movie = s.get_movies(genres)
    return jsonify({'message': 'Success', 'movie': movie}), 200

if __name__ == "__main__":
    app.run(debug=True)
    