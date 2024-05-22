from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/submit', methods=["POST"])
def submit():
    data = request.get_json()
    options = data.get("options", [])
    print(options)
    return jsonify({'message': 'Success', 'received_options': options}), 200

if __name__ == "__main__":
    app.run(debug=True)