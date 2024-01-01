#server/models.py
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, metadata
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

    serialize_rules = ('-password',)

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    display_name = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    
    projects = db.relationship('Project', back_populates='user')
    recommendations = db.relationship('Recommendation', secondary=user_recomendations, back_populates='users')
    energy_assessments = db.relationship('EnergyAssessment', back_populates='user')
    
class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    name = db.Column(db.String(80), unique=True, nullable=False)
    goals = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    user = db.relationship('User', back_populates='projects')
    project_updates = db.relationship('ProjectUpdate', back_populates='project')
    
class ProjectUpdate(db.Model, SerializerMixin):
    __tablename__ = 'project_updates'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    project_id = db.Column(UUID(as_uuid=True), db.ForeignKey('projects.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    text = db.Column(db.Text, nullable=False)
    
    project = db.relationship('Project', back_populates='project_updates')
    
class Recommendation(db.Model, SerializerMixin):
    __tablename__ = 'recommendations'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    text = db.Column(db.Text, nullable=False)
    assessment = db.Column(db.String, nullable=False)
    question = db.Column(db.String, nullable=False)
    impact_level = db.Column(db.Integer, nullable=False)
    
    users = db.relationship('User', secondary=user_recomendations, back_populates='recommendations')
    
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
    
class EnergyAssessmentQuestions (db.Model, SerializerMixin):
    __tablename__ = 'energy_assessment_questions'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    short = db.Column(db.String, nullable=False)
    full = db.Column(db.String, nullable=False)
    options = db.Column(db.Array(db.String))
    