from flask import Flask, request, jsonify
from flask_cors import CORS
from logic import verifier_mot

app = Flask(__name__)
CORS(app)

# ✅ Route test
@app.route('/')
def home():
    return "API Malagasy IA fonctionne 🚀"

# ✅ Route API correcte
@app.route('/api/check', methods=['POST'])
def check():
    data = request.json
    text = data.get("text", "")

    mots = text.split()
    resultats = [verifier_mot(m) for m in mots]

    return jsonify(resultats)

if __name__ == '__main__':
    app.run(debug=True)