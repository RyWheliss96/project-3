import numpy as np

from pymongo import MongoClient

from flask_cors import CORS, cross_origin

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
client = MongoClient('localhost', 27017)

db = client.harrypotter
collection = db.characters

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

CORS(app)

#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/jsonify/")
def json():
    objects = collection.find({}, {'_id': 0})

    return jsonify(list(objects))



if __name__ == '__main__':
    app.run(debug=True)
