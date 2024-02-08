from flask import request, make_response, session, render_template, send_from_directory, Flask
from sqlalchemy.orm import validates
from flask_restful import Resource, Api
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
import os
from dotenv import load_dotenv
from sqlalchemy.exc import IntegrityError
import jwt
import datetime
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
import uuid
from sqlalchemy.dialects.postgresql import UUID

load_dotenv()

#############################################
#                                           #
#                                           #
#                  CONFIG                   #
#                                           #
#############################################

app = Flask(
    __name__,
    static_url_path='',
    static_folder='/client/dist',
    template_folder='/client/dist')

SECRET_KEY = os.getenv('SECRET_KEY')
app.secret_key = SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SUPABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_COOKIE_NAME'] = 'id'
app.config['SESSION_COOKIE_SECURE'] = True  
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None' 

metadata = MetaData(naming_convention={
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db, render_as_batch=True)

db.init_app(app)
api = Api(app)
bcrypt = Bcrypt(app)


#############################################
#                                           #
#                                           #
#                  MODELS                   #
#                                           #
#############################################

user_recomendations = db.Table(
    'user_recommendations',
    metadata,
    db.Column('user_id',UUID(as_uuid=True), db.ForeignKey('users.id'), primary_key=True),
    db.Column('recommendation_id',UUID(as_uuid=True), db.ForeignKey('recommendations.id'), primary_key=True)
)
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    display_name = db.Column(db.String(80), nullable=False)
    _password_hash = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    
    projects = db.relationship('Project', back_populates='user', cascade="all, delete-orphan")
    recommendations = db.relationship('Recommendation', secondary=user_recomendations, back_populates='users')
    energy_assessments = db.relationship('EnergyAssessment', back_populates='user', cascade="all, delete-orphan")
    
    serialize_rules = ('-_password_hash','-projects.user','-energy_assessments.user','-recommendations.users',)
    
    def __repr__(self) -> str:
        return f"<User {self.username}>"
    
    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
        
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    goals = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    completed_at = db.Column(db.DateTime)
    
    user = db.relationship('User', back_populates='projects')
    project_updates = db.relationship('ProjectUpdate', back_populates='project', cascade="all, delete-orphan")
    
    serialize_rules = ('-user.projects','-project_updates.project','-user.energy_assessments','-user.recommendations',)
    
    @validates('title')
    def validates_title(self, key, title):
        if not isinstance(title, str) or len(title) < 3:
            raise ValueError('Project title must be a string longer than 3 characters')
        return title
    
    @validates('category')
    def validates_category(self, key, category):
        if category not in ['Energy', 'Water', 'Waste', 'Food', 'Transportation','Land Use']:
            raise ValueError('Project category must be one of: Energy, Water, Waste, Food, Transportation, Land Use')
        return category
    
class ProjectUpdate(db.Model, SerializerMixin):
    __tablename__ = 'project_updates'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = db.Column(UUID(as_uuid=True), db.ForeignKey('projects.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    text = db.Column(db.Text, nullable=False)
    
    project = db.relationship('Project', back_populates='project_updates')
    
    serialize_rules = ('-project.project_updates','-users')
    
class Recommendation(db.Model, SerializerMixin):
    __tablename__ = 'recommendations'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    title = db.Column(db.String, nullable=False)
    text = db.Column(db.Text, nullable=False)
    assessment = db.Column(db.String, nullable=False)
    question_id = db.Column(UUID(as_uuid=True), db.ForeignKey('energy_assessment_questions.id'), nullable=False)
    triggering_values = db.Column(db.ARRAY(db.String), nullable=False)
    impact_level = db.Column(db.Integer, nullable=False)
    
    users = db.relationship('User', secondary=user_recomendations, back_populates='recommendations')
    question = db.relationship('EnergyAssessmentQuestion', back_populates='recommendation')
    
    serialize_rules = ('-users.recommendations','-question.recommendation','-projects','-energy_assessments')
    
class EnergyAssessment(db.Model, SerializerMixin):
    __tablename__ = 'energy_assessments'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'))
    lighting_type = db.Column(db.String)
    light_habits = db.Column(db.String)
    daylighting = db.Column(db.String)
    landscape_lights = db.Column(db.String)
    heating_type = db.Column(db.String)
    heating_age = db.Column(db.Integer)
    cooling_type = db.Column(db.String)
    cooling_age = db.Column(db.Integer)
    deg_between_setpoints = db.Column(db.Integer)
    filter_changes = db.Column(db.String)
    ductwork_condition = db.Column(db.String)
    roof_color = db.Column(db.String)
    window_age = db.Column(db.Integer)
    window_type = db.Column(db.String)
    e_star_appliances = db.Column(db.String)
    toilet_flush = db.Column(db.String)
    sink_flow = db.Column(db.String)
    shower_flow = db.Column(db.String)
    water_heater_type = db.Column(db.String)
    water_heater_age = db.Column(db.Integer)
    grounds = db.Column(db.String)
    rainwater = db.Column(db.String)
    irrigation = db.Column(db.String)
    irrigation_controls = db.Column(db.String)
    re_sources = db.Column(db.String)
    re_percentage = db.Column(db.Integer)
    
    user = db.relationship('User', back_populates='energy_assessments')
    
    serialize_rules = ('-user.energy_assessments','-projects')
    
class EnergyAssessmentQuestion (db.Model, SerializerMixin):
    __tablename__ = 'energy_assessment_questions'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sort_order = db.Column(db.Integer)
    short = db.Column(db.String, nullable=False)
    full = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    options = db.Column(db.ARRAY(db.String), nullable = True)
    
    recommendation = db.relationship('Recommendation', back_populates='question', cascade="all, delete-orphan")
        
    serialize_rules = ('-recommendation.question','-users')
    
    def __repr__(self):
        return f'<EnergyAssessmentQuestion id={self.id} short={self.short}>'







@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

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
