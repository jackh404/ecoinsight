from flask import Flask
import os
from dotenv import load_dotenv
from config import db, migrate, app, api, cors
from models import User
load_dotenv()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


port = os.getenv('SERVER_PORT')
debug = os.getenv('SERVER_DEBUG')
host = os.getenv('SERVER_HOST')
if __name__ == '__main__':
    app.run(host = host, port = port, debug = debug)