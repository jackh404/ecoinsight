#!/usr/bin/env python3
#server/seed.py
import uuid
from app import app
from models import db, EnergyAssessmentQuestion, Recommendation
if __name__ == "__main__":
    with app.app_context():
        Recommendation.query.delete()
        EnergyAssessmentQuestion.query.delete()
        questions = []
        #0
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'lighting',
            full = 'Lighting',
            type = 'heading',
            options = None
        ))
        #1
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'lighting_type',
            full = 'What type of lighting is predominantly used in your home?',
            type = 'select',
            options = ['','LED', 'CFL', 'Halogen', 'Fluorescent', 'Incandescent']
        ))
        #2
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'light_habits',
            full = 'Do you and your family take care to turn lights off in unoccupied rooms?',
            type = 'select',
            options = ['','Yes', 'No', 'Sometimes']
        ))
        #3
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'daylighting',
            full = 'Do you make use of daylight in your home, turning off lights when enough natural light is present?',
            type = 'select',
            options = ['','Yes', 'No', 'Sometimes', 'Not an option']
        ))
        #4
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'landscape_lights',
            full = 'Do you have outdoor lighting that you leave on all night?',
            type = 'select',
            options = ['','Yes', 'No', 'Sometimes']
        ))
        #5
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'hvac',
            full = 'Heating and Cooling',
            type = 'heading',
            options = None
        ))
        #6
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'heating_type',
            full = 'What type of heating is primarily used in your home?',
            type = 'select',
            options = ['','Gas', 'Electric', 'Oil', 'Heat Pump (Air Source)', 'Heat Pump (Geothermal)', 'Wood', 'Other']
        ))
        #7
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'heating_age',
            full = 'How old is your heating system?',
            type = 'number',
            options = None
        ))
        #8
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'cooling_type',
            full = 'What type of cooling is primarily used in your home?',
            type = 'select',
            options = ['','Traditional AC', 'Evaporative Cooling', 'None', 'Other']
        ))
        #9
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'cooling_age',
            full = 'How old is your cooling system?',
            type = 'number',
            options = None
        ))
        #10
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'deg_between_setpoints',
            full = 'What is the temperature difference between your heating and cooling setpoints?',
            type = 'number',
            options = None
        ))
        #11
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'filter_changes',
            full = 'Do you regularly change your HVAC system air filters? Typical filter lifecycle is 3 months.',
            type = 'select',
            options = ['','Yes', 'No', 'Sometimes']
        ))
        #12
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'ductwork_condition',
            full = 'What is the condition of your ductwork?',
            type = 'select',
            options = ['','Good', 'Poor', 'No Ductwork',"I don't know"]
        ))
        #13
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'structure',
            full = 'Structural',
            type = 'heading',
            options = None
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'roof_color',
            full = "What is the general color of your home's roof?",
            type = 'select',
            options = ['','Dark', 'Medium', 'Light', "I don't know"]
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'window_age',
            full = 'How old are your windows?',
            type = 'number',
            options = None
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'window_type',
            full = 'What type of window is primarily used in your home?',
            type = 'select',
            options = ['','Aluminum', 'Vinyl', 'Wood', "I don't know"]
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'appliances',
            full = 'Appliances',
            type = 'heading',
            options = None
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'e_star_appliances',
            full = 'Are your home appliances energy star compliant?',
            type = 'select',
            options = ['','None','Some','Most','All',"I don't know"]
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'water',
            full = 'Water Use',
            type  = 'heading',
            options = None
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'toilet_flush',
            full = 'Are the toilets in your home low-flow?',
            type = 'select',
            options = ['','Yes', 'No', "I don't know"]
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'sink_flow',
            full = 'Are the sinks in your home low-flow?',
            type = 'select',
            options = ['','Yes', 'No', "I don't know"]
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'shower_flow',
            full = 'Are the showers in your home low-flow?',
            type = 'select',
            options = ['','Yes', 'No', "I don't know"]
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'water_heater_type',
            full = 'What type of water heater do you have?',
            type = 'select',
            options = ['','Gas (Tank)', 'Electric (Tank)', 'Gas (Tankless)','Electric (Tankless)','Heat Pump', "I don't know"]
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'water_heater_age',
            full = 'How old is your water heater?',
            type = 'number',
            options = None
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'grounds',
            full = 'Do you have a lawn, garden, or other grounds that you maintain?',
            type = 'select',
            options = ['','Yes', 'No']
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'rainwater',
            full = 'Do you collect rainwater for use on your lawn or garden?',
            type = 'select',
            options = ['','Yes', 'No']
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'irrigation',
            full = 'Do you irrigate your lawn or garden with drinking water?',
            type = 'select',
            options = ['','Yes', 'No', 'Sometimes']
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 'irrigation_controls',
            full = 'If you answered yes to the question above, do you ensure that you do not water pavement, let water evaporate in the heat of the day, or irrigate during/after rain?',
            type = 'select',
            options = ['','Yes', 'No', 'Sometimes']
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 're_energy',
            full = 'Renewable Energy',
            type = 'heading',
            options = None
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 're_sources',
            full = 'Do you have any renewable energy sources at your residence?',
            type = 'select',
            options = ['','Solar', 'Wind', 'Microhydroelectric', 'Other']
        ))
        questions.append(EnergyAssessmentQuestion(
            id=str(uuid.uuid4()),
            short = 're_percentage',
            full = 'What percentage of your energy is provided or offset by renewable sources?',
            type = 'number',
            options = None
        ))
        db.session.add_all(questions)
        db.session.commit()
        recommendations = []
        recommendations.append(Recommendation(
            id=str(uuid.uuid4()),
            title = 'Swap out your light bulbs',
            text = """Incandescent lightbulbs were superseded by fluorescent (and compact fluorescent) lightbulbs, which have been more or less replaced by LEDs. This is largely due to the fact that "LEDs use up to 90% less energy and last up to 25 times longer than traditional incandescent bulbs." - US Department of Energy. 
            While you certainly don't need to replace all your light bulbs at once, you should consider buying LEDs as your older bulbs wear out.""",
            assessment = 'Energy Assessment',
            question_id = questions[1].id,
            triggering_values = ['Incandescent', 'Fluorescent'],
            impact_level = 1
        ))
        recommendations.append(Recommendation(
            id=str(uuid.uuid4()),
            title = 'Turn off landscaping lights',
            text = 'Landscaping lights, while they may be attractive, create multiple issues in terms of environmental impact. They tend to be fairly high in power consumption, particularly when left on all night. They can also contribute to light pollution, which is harmful to local wildlife. Consider putting these lights on a timer or turning them off entirely.',
            assessment = 'Energy Assessment',
            question_id = questions[4].id,
            triggering_values = ['Yes','Sometimes'],
            impact_level = 1
        ))
        recommendations.append(Recommendation(
            id=str(uuid.uuid4()),
            title = 'Replace Heating System',
            text = 'Replacing your heating system is a daunting endeavor, but can result in significant energy savings, reducing both environmental impact and long-term costs.',
            assessment = 'Energy Assessment',
            question_id = questions[7].id,
            triggering_values = ['greater_than','20'],
            impact_level = 3
        ))
        recommendations.append(Recommendation(
            id=str(uuid.uuid4()),
            title = 'Replace cooling system',
            text = 'Replacing your cooling system is a daunting endeavor, but can result in significant energy savings, reducing both environmental impact and long-term costs.',
            assessment = 'Energy Assessment',
            question_id = questions[9].id,
            triggering_values = ['greater_than','15'],
            impact_level = 2
        ))
        recommendations.append(Recommendation(
            id=str(uuid.uuid4()),
            title = 'Adjust with the Seasons',
            text = 'While it can certainly be pleasant, keeping your home at one set temperature year-round results in significant energy use that is likely unneccessary. Try adjusting your thermostat to allow for a warmer home in the summer and a cooler home in the winter. This may require different habits for indoor dress, but is one of the few steps guaranteed to reduce energy use without upfront cost.',
            assessment = 'Energy Assessment',
            question_id = questions[10].id,
            triggering_values = ['less_than','5'],
            impact_level = 2
        ))
        db.session.add_all(recommendations)
        db.session.commit()