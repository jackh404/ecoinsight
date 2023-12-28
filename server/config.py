#server/congig.py
import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
load_dotenv()

app = Flask(__name__)

cors = CORS(app, supports_credentials=True, resources={
    r"/*": {
       "origins": ["http://127.0.0.1:5174"],
       "methods": ["GET", "POST", "PATCH", "PUT", "DELETE"],
       "allow_headers": ["Content-Type", "Authorization"]
    }
})


