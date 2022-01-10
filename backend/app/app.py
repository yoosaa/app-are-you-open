import datetime
import os

from flask import Flask, cli, render_template
from pymongo import MongoClient

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def mongo_init() -> MongoClient:
    host = 'localhost'
    port = 27017
    db = 'enjin'
    user = 'sano'
    pwd = 'sano'
    client = MongoClient(host, port)
    client[db].authenticate(user, pwd)
    return client
