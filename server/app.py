from flask import request, make_response
from flask_restful import Resource
import os
from dotenv import load_dotenv
from config import db, migrate, app, api, cors
from models import User, Project, ProjectUpdate, Recommendation, EnergyAssessment, user_recomendations
load_dotenv()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

class UserById(Resource):
    def get(self, id):
        user = User.query.get(id)
        if user:
            return make_response(user.to_dict(), 200)
        return make_response({"message": "User not found"}, 404)
    
    def patch(self, id):
        user = User.query.get(id)
        if user:
            for key, value in request.json.items():
                setattr(user, key, value)
            db.session.commit()
            return make_response(user.to_dict(), 200)
        return make_response({"message": "User not found"}, 404)
    
class Users(Resource):
    def get(self):
        users = User.query.all()
        return make_response([user.to_dict() for user in users], 200)
    
    def post(self):
        user = User(**request.json)
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 201)
    
class Projects(Resource):
    def get(self):
        projects = Project.query.all()
        return make_response([project.to_dict() for project in projects], 200)
    
    def post(self):
        project = Project(**request.json)
        db.session.add(project)
        db.session.commit()
        return make_response(project.to_dict(), 201)
    
class ProjectById(Resource):
    def get(self, id):
        project = Project.query.get(id)
        if project:
            return make_response(project.to_dict(), 200)
        return make_response({"message": "Project not found"}, 404)
    
    def delete(self, id):
        project = Project.query.get(id)
        if project:
            db.session.delete(project)
            db.session.commit()
            return make_response({"message": "Project deleted"}, 204)
        return make_response({"message": "Project not found"}, 404)
    
class Recommendations(Resource):
    def get(self):
        recommendations = Recommendation.query.all()
        return make_response([recommendation.to_dict() for recommendation in recommendations], 200)
    
class EnergyAssessmentQuestions(Resource):
    def get(self):
        questions = EnergyAssessmentQuestions.query.all()
        return make_response([question.to_dict() for question in questions], 200)
    
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(Users, '/users')
api.add_resource(ProjectById, '/projects/<int:id>')
api.add_resource(Projects, '/projects')
api.add_resource(Recommendations, '/recommendations')
api.add_resource(EnergyAssessmentQuestions, '/energy_assessment_questions')

port = os.getenv('SERVER_PORT')
debug = os.getenv('SERVER_DEBUG')
host = os.getenv('SERVER_HOST')
if __name__ == '__main__':
    app.run(host = host, port = port, debug = debug)