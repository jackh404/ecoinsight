from flask import request, make_response, session, render_template
from flask_restful import Resource
import os
from dotenv import load_dotenv
from config import db, migrate, app, api
from models import User, Project, ProjectUpdate, Recommendation, EnergyAssessment, user_recomendations

load_dotenv()

@app.route('/')
def index():
    return render_template('index.html')

class Signup(Resource):
    def post(self):
        json = request.json
        try:
            user = User(
                username = json['username'],
                email = json['email'],
                first_name = json['first_name'],
                last_name = json['last_name'],
                display_name = json['display_name'])
            user.password_hash = json['password']
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return make_response(user.to_dict(), 201)
        except ValueError as ve:
            db.session.rollback()
            return make_response({"message": str(ve)}, 422)
        except Exception as e:
            return make_response({"message": str(e)}, 500)
api.add_resource(Signup, '/signup')
        
class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        return {}, 204
api.add_resource(CheckSession, '/check_session')
    
class Login(Resource):
    def post(self):
        json = request.get_json()
        user = User.query.filter(User.username == json['username']).first()
        if user:
            if user.authenticate(json['password']):
                session['user_id'] = user.id
                return user.to_dict(), 200
        else:
            return {"message":"Incorrect username or password"}, 401
api.add_resource(Login, '/login')
        
class Logout(Resource):
    def delete(self):
            if session['user_id']:
                session['user_id'] = None
                return {}, 204
            else:
                return {'message': 'Unauthorized'}, 401
api.add_resource(Logout, '/logout')

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
    
    def delete(self, id):
        user = User.query.get(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response({"message": "User deleted"}, 204)
        return make_response({"message": "User not found"}, 404)
api.add_resource(UserById, '/users/<int:id>')

class Users(Resource):
    def get(self):
        users = User.query.all()
        return make_response([user.to_dict() for user in users], 200)
    
    def post(self):
        user = User(**request.json)
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 201)
api.add_resource(Users, '/users')
    
class Projects(Resource):
    def get(self):
        projects = Project.query.all()
        return make_response([project.to_dict() for project in projects], 200)
    
    def post(self):
        project = Project(**request.json)
        db.session.add(project)
        db.session.commit()
        return make_response(project.to_dict(), 201)
api.add_resource(Projects, '/projects')
    
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
api.add_resource(ProjectById, '/projects/<int:id>')
    
class Recommendations(Resource):
    def get(self):
        recommendations = Recommendation.query.all()
        return make_response([recommendation.to_dict() for recommendation in recommendations], 200)
api.add_resource(Recommendations, '/recommendations')
    
class EnergyAssessmentQuestions(Resource):
    def get(self):
        questions = EnergyAssessmentQuestions.query.all()
        return make_response([question.to_dict() for question in questions], 200)
api.add_resource(EnergyAssessmentQuestions, '/energy_assessment_questions')

    

debug = os.getenv('SERVER_DEBUG')

if __name__ == '__main__':
    app.run(port=5555, debug = debug)