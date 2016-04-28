import json
from flask import Flask, render_template, request, jsonify
from flask.ext.cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return jsonify({"status": 201})


if __name__ == "__main__":
    app.debug = True
    app.run()
