import numpy as np

from pymongo import MongoClient

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


#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
