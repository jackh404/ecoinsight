from flask import request, make_response, session, render_template
from flask_restful import Resource
import os
from dotenv import load_dotenv
from sqlalchemy.exc import IntegrityError
import jwt
import datetime
import uuid

from config import db, migrate, app, api
from models import User, Project, ProjectUpdate, Recommendation, EnergyAssessment, user_recomendations, EnergyAssessmentQuestion

load_dotenv()

SECRET_KEY = os.environ.get('SECRET_KEY')

@app.route('/')
def index():
    return render_template('index.html')

########################################################
#                   USER ROUTES                        #
########################################################

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
            token = jwt.encode({
                    'user_id': user.id,
                    'exp': datetime.utcnow() + datetime.timedelta(hours=24)
                }, os.environ.get('SECRET_KEY'), algorithm="HS256")
            resp = make_response({'user':user.to_dict(),
                                    'message': 'Login successful'}, 200)
            resp.set_cookie('jwt', token, httponly=True)
            return resp
        except ValueError as ve:
            db.session.rollback()
            return make_response({"message": str(ve)}, 422)
        except IntegrityError as ie:
            db.session.rollback()
            return make_response({"message": str(ie)}, 422)
        except Exception as e:
            db.session.rollback()
            return make_response({"message": str(e)}, 500)
api.add_resource(Signup, '/signup')
        
class CheckSession(Resource):
    def get(self):
        token = request.cookies.get('jwt')
        if not token:
            return {'message': 'No Active Session'}, 204
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return {'message': 'Token Expired'}, 401
        except jwt.InvalidTokenError:
            return {'message': 'Invalid Token'}, 401
        user = User.query.filter_by(id=data['user_id']).first()
        if user:
            return {'user': user.to_dict()}, 200
api.add_resource(CheckSession, '/api/check_session')
    
class Login(Resource):
    def post(self):
        json = request.get_json()
        user = User.query.filter(User.username == json['username']).first()
        if user:
            if user.authenticate(json['password']):
                token = jwt.encode({
                    'user_id': str(user.id),
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, 
                    SECRET_KEY,
                    algorithm="HS256")
                resp = make_response({'user':user.to_dict(),
                                      'message': 'Login successful'}, 200)
                resp.set_cookie('jwt', token, httponly=True)
                return resp
            else:
                return make_response({'message': 'Incorrect username or password'}, 401)
        else:
            return {"message":"Incorrect username or password"}, 401
api.add_resource(Login, '/api/login')
        
class Logout(Resource):
    def delete(self):
        resp = make_response({'message': 'Logout successful'}, 200)
        resp.set_cookie('jwt', '', expires=0)
        return resp
api.add_resource(Logout, '/api/logout')

class UserById(Resource):
    def get(self, id):
        user = User.query.get(id)
        if user:
            return make_response(user.to_dict(), 200)
        return make_response({"message": "User not found"}, 404)
    
    def patch(self, id):
        user = User.query.get(id)
        if user:
            allowed_keys = {'first_name', 'last_name', 'display_name', 'email', 'username'}
            for key, value in request.json.items():
                if key == 'password':
                    user.password_hash = value
                elif key in allowed_keys:
                    setattr(user, key, value)

            db.session.commit()
            return make_response({'user': user.to_dict(), 'message': 'User updated'}, 200)

        return make_response({"message": "User not found"}, 404)
    
    def delete(self, id):
        token = request.cookies.get('jwt')
        data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user = User.query.get(id)
        if user:
            if id == data['user_id']:
                db.session.delete(user)
                db.session.commit()
                return make_response({"message": "User deleted"}, 204)
            else:
                return make_response({"message": "Unauthorized"}, 401)
        else:
            return make_response({"message": "User not found"}, 404)
api.add_resource(UserById, '/api/users/<uuid:id>')

class Users(Resource):
    def get(self):
        users = User.query.all()
        return make_response([user.to_dict() for user in users], 200)
    
    def post(self):
        newUser = {k: v for k, v in request.json.items() if k!='password'}
        try:
            user = User(**newUser)
            user.password_hash = request.json['password']
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(), 201)
        except IntegrityError as ie:
            db.session.rollback()
            return make_response({"message": str(ie)}, 422)
        except Exception as e:
            db.session.rollback()
            return make_response({"message": str(e)}, 500)
api.add_resource(Users, '/api/users')

########################################################
#                 PROJECT ROUTES                       #
########################################################
    
class Projects(Resource):
    def get(self):
        projects = Project.query.all()
        return make_response([project.to_dict() for project in projects], 200)
    
    def post(self):
        project = Project(**request.json)
        db.session.add(project)
        db.session.commit()
        return make_response(project.to_dict(), 201)
api.add_resource(Projects, '/api/projects')
    
class ProjectById(Resource):
    def get(self, id):
        project = Project.query.get(id)
        if project:
            return make_response(project.to_dict(), 200)
        return make_response({"message": "Project not found"}, 404)
    
    def delete(self, id):
        project = Project.query.filter_by(id=id).first()
        if project:
            db.session.delete(project)
            db.session.commit()
            return make_response({"message": "Project deleted"}, 204)
        return make_response({"message": "Project not found"}, 404)
api.add_resource(ProjectById, '/api/projects/<uuid:id>')

class UpdateProject(Resource):
    def post(self):
        update = ProjectUpdate(**request.json)
        db.session.add(update)
        db.session.commit()
        return make_response(update.to_dict(), 201)
api.add_resource(UpdateProject, '/api/project_updates')

########################################################
#              RECOMMENDATION ROUTES                   #
########################################################
    
class Recommendations(Resource):
    def get(self):
        recommendations = Recommendation.query.all()
        return make_response([recommendation.to_dict() for recommendation in recommendations], 200)
api.add_resource(Recommendations, '/api/recommendations')

class RecommendationsByUser(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            recommendations = user.recommendations
            return make_response([recommendation.to_dict() for recommendation in recommendations], 200)
        return make_response({"message": "User not found"}, 404)
api.add_resource(RecommendationsByUser, '/api/users/<uuid:id>/recommendations')

#########################################################
#              ENERGY ASSESSMENT ROUTES                 #
#########################################################
    
class EnergyAssessmentQuestions(Resource):
    def get(self):
        questions = EnergyAssessmentQuestion.query.all()#.sort(key=lambda q: q.sort_order)
        return make_response([question.to_dict() for question in questions], 200)
api.add_resource(EnergyAssessmentQuestions, '/api/energy_assessment_questions')

class EnergyAssessments(Resource):
    def get(self):
        assessments = EnergyAssessment.query.all()
        return make_response([assessment.to_dict() for assessment in assessments], 200)
    def post(self):
        user = User.query.filter_by(id=request.json['user_id']).first()
        assessment = EnergyAssessment(**request.json)
        for key in request.json:
            q = EnergyAssessmentQuestion.query.filter_by(short=key).first()
            if q:
                rec = Recommendation.query.filter_by(question_id=q.id).first()
                if rec:
                    conds = rec.triggering_values
                    if conds[0] == 'greater_than':
                        print(f'{request.json[key]} > {conds[1]}?')
                        print(int(request.json[key]) > int(conds[1]))
                        if int(request.json[key]) > int(conds[1]):
                            if rec not in user.recommendations:
                                user.recommendations.append(rec)
                        elif rec in user.recommendations:
                            user.recommendations.remove(rec)
                    elif conds[0] == 'less_than':
                        print(f'{request.json[key]} < {conds[1]}?')
                        print(int(request.json[key]) < int(conds[1]))
                        if int(request.json[key]) < int(conds[1]):
                            if rec not in user.recommendations:
                                user.recommendations.append(rec)
                        elif rec in user.recommendations:
                            user.recommendations.remove(rec)
                    elif request.json[key] in conds:
                        if rec not in user.recommendations:
                            user.recommendations.append(rec)
                    elif rec in user.recommendations:
                        user.recommendations.remove(rec)
        db.session.add(assessment)
        db.session.commit()
        return make_response({'assessment': assessment.to_dict(),'recommendations': [rec.to_dict() for rec in user.recommendations]}, 201)
api.add_resource(EnergyAssessments, '/api/energy_assessments')    

debug = os.getenv('SERVER_DEBUG')

if __name__ == '__main__':
    app.run(port=5555, debug = debug)