#server/models.py
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, metadata, bcrypt
import uuid
from sqlalchemy.dialects.postgresql import UUID

user_recomendations = db.Table(
    'user_recommendations',
    metadata,
    db.Column('user_id',UUID(as_uuid=True), db.ForeignKey('users.id'), primary_key=True),
    db.Column('recommendation_id',UUID(as_uuid=True), db.ForeignKey('recommendations.id'), primary_key=True)
)
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    display_name = db.Column(db.String(80), nullable=False)
    _password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    
    projects = db.relationship('Project', back_populates='user', cascade="all, delete-orphan")
    recommendations = db.relationship('Recommendation', secondary=user_recomendations, back_populates='users')
    energy_assessments = db.relationship('EnergyAssessment', back_populates='user', cascade="all, delete-orphan")
    
    serialize_rules = ('-password','-projects.user','-energy_assessments.user','-recommendations.users',)
    
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

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(80), unique=True, nullable=False)
    goals = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    user = db.relationship('User', back_populates='projects')
    project_updates = db.relationship('ProjectUpdate', back_populates='project', cascade="all, delete-orphan")
    
    serialize_rules = ('-user.projects','-project_updates.project','-energy_assessments','-recommendations',)
    
class ProjectUpdate(db.Model, SerializerMixin):
    __tablename__ = 'project_updates'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    project_id = db.Column(UUID(as_uuid=True), db.ForeignKey('projects.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    text = db.Column(db.Text, nullable=False)
    
    project = db.relationship('Project', back_populates='project_updates')
    
    serialize_rules = ('-project.project_updates','-users')
    
class Recommendation(db.Model, SerializerMixin):
    __tablename__ = 'recommendations'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    text = db.Column(db.Text, nullable=False)
    assessment = db.Column(db.String, nullable=False)
    question_id = db.Column(UUID(as_uuid=True), db.ForeignKey('energy_assessment_questions.id'), nullable=False)
    impact_level = db.Column(db.Integer, nullable=False)
    
    users = db.relationship('User', secondary=user_recomendations, back_populates='recommendations')
    question = db.relationship('EnergyAssessmentQuestions', back_populates='recommendation')
    
    serialize_rules = ('-users.recommendations','-question.recommendation','-projects','-energy_assessments')
    
class EnergyAssessment(db.Model, SerializerMixin):
    __tablename__ = 'energy_assessments'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'))
    lighting_type = db.Column(db.String)
    light_habits = db.Column(db.String)
    daylighting = db.Column(db.String)
    landscape_lights = db.Column(db.Boolean)
    heating_type = db.Column(db.String)
    heating_age = db.Column(db.Integer)
    cooling_type = db.Column(db.String)
    cooling_age = db.Column(db.Integer)
    deg_between_setpoints = db.Column(db.Integer)
    filter_changes = db.Column(db.Boolean)
    ductwork_condition = db.Column(db.Integer)
    air_sealing = db.Column(db.Integer)
    roof_color = db.Column(db.String)
    window_age = db.Column(db.Integer)
    window_type = db.Column(db.String)
    e_star_appliances = db.Column(db.Integer)
    toilet_flush = db.Column(db.Float)
    sink_flow = db.Column(db.Float)
    shower_flow = db.Column(db.Float)
    water_heater_type = db.Column(db.String)
    water_heater_age = db.Column(db.Integer)
    rainwater = db.Column(db.Boolean)
    irrigation = db.Column(db.String)
    irrigation_controls = db.Column(db.String)
    re_sources = db.Column(db.String)
    re_percentage = db.Column(db.Integer)
    
    user = db.relationship('User', back_populates='energy_assessments')
    
    serialize_rules = ('-user.energy_assessments','-projects')
    
class EnergyAssessmentQuestions (db.Model, SerializerMixin):
    __tablename__ = 'energy_assessment_questions'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    short = db.Column(db.String, nullable=False)
    full = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    options = db.Column(db.ARRAY(db.String), nullable = True)
    
    recommendation = db.relationship('Recommendation', back_populates='question')
        
    serialize_rules = ('-recommendation.question','-users')