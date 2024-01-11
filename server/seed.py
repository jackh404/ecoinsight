#!/usr/bin/env python3
#server/seed.py
import uuid
from app import app
from models import EnergyAssessmentQuestions, db
if __name__ == "__main__":
    with app.app_context():
        EnergyAssessmentQuestions.query.delete()
        questions = []
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'ligthing_type',
            full = 'What type of lighting id predominantly used in your home?',
            type = 'select',
            options = ['LED', 'CFL', 'Halogen', 'Fluorescent', 'Incandescent']
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'light_habits',
            full = 'Do you and your family take care to turn lights off in unoccupied rooms?',
            type = 'select',
            options = ['Yes', 'No', 'Sometimes']
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'daylighting',
            full = 'Do you make use of daylight in your home, turning off lights when enough natural light is present?',
            type = 'select',
            options = ['Yes', 'No', 'Sometimes', 'Not an option']
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'landscape_lights',
            full = 'Do you have outdoor lighting that you leave on all night?',
            type = 'select',
            options = ['Yes', 'No', 'Sometimes']
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'heating_type',
            full = 'What type of heating is primarily used in your home?',
            type = 'select',
            options = ['Gas', 'Electric', 'Oil', 'Heat Pump (Air Source)', 'Heat Pump (Geothermal)', 'Wood', 'Other']
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'heating_age',
            full = 'How old is your heating system?',
            type = 'number',
            options = None
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'cooling_type',
            full = 'What type of cooling is primarily used in your home?',
            type = 'select',
            options = ['Traditional AC', 'Evaporative Cooling', 'None', 'Other']
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'cooling_age',
            full = 'How old is your cooling system?',
            type = 'number',
            options = None
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'deg_between_setpoints',
            full = 'What is the temperature difference between your heating and cooling setpoints?',
            type = 'number',
            options = None
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'filter_changes',
            full = 'Do you regularly change your HVAC system air filters? Typical filter lifecycle is 3 months.',
            type = 'select',
            options = ['Yes', 'No', 'Sometimes']
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'ductwork_condition',
            full = 'What is the condition of your ductwork?',
            type = 'select',
            options = ['Good', 'Poor', 'No Ductwork',"I don't know"]
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'roof_color',
            full = "What is the general color of your home's roof?",
            type = 'select',
            options = ['Dark', 'Medium', 'Light', "I don't know"]
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'window_age',
            full = 'How old are your windows?',
            type = 'number',
            options = None
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'window_type',
            full = 'What type of window is primarily used in your home?',
            type = 'select',
            options = ['Aluminum', 'Vinyl', 'Wood', "I don't know"]
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'e_star_appliances',
            full = 'Are your home appliances energy star compliant?',
            type = 'select',
            options = ['None','Some','Most','All',"I don't know"]
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'toilet_flush',
            full = 'Are the toilets in your home low-flow?',
            type = 'select',
            options = ['Yes', 'No', "I don't know"]
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'sink_flow',
            full = 'Are the sinks in your home low-flow?',
            type = 'select',
            options = ['Yes', 'No', "I don't know"]
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'shower_flow',
            full = 'Are the showers in your home low-flow?',
            type = 'select',
            options = ['Yes', 'No', "I don't know"]
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'water_heater_type',
            full = 'What type of water heater do you have?',
            type = 'select',
            options = ['Gas (Tank)', 'Electric (Tank)', 'Gas (Tankless)','Electric (Tankless)','Heat Pump', "I don't know"]
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'water_heater_age',
            full = 'How old is your water heater?',
            type = 'number',
            options = None
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'grounds',
            full = 'Do you have a lawn, garden, or other grounds that you maintain?',
            type = 'select',
            options = ['Yes', 'No']
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'rainwater',
            full = 'Do you collect rainwater for use on your lawn or garden?',
            type = 'select',
            options = ['Yes', 'No']
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'irrigation',
            full = 'Do you irrigate your lawn or garden with drinking water?',
            type = 'select',
            options = ['Yes', 'No', 'Sometimes']
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 'irrigation_controls',
            full = 'If you answered yes to the question above, do you ensure that you do not water pavement, let water evaporate in the heat of the day, or irrigate during/after rain?',
            type = 'select',
            options = ['Yes', 'No', 'Sometimes']
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 're_sources',
            full = 'Do you have any renewable energy sources at your residence?',
            type = 'select',
            options = ['Solar', 'Wind', 'Microhydroelectric', 'Other']
        ))
        questions.append(EnergyAssessmentQuestions(
            id=str(uuid.uuid4()),
            short = 're_percentage',
            full = 'What percentage of your energy is provided or offset by renewable sources?',
            type = 'number',
            options = None
        ))
        db.session.add_all(questions)
        db.session.commit()