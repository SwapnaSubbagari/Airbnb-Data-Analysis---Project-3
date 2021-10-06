import sqlite3
from flask import (Flask, render_template, jsonify, redirect, request, g)
import flask
from flask_sqlalchemy import SQLAlchemy
from models import create_classes
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


Airbnb_engine = create_engine('sqlite:///Airbnb_Analysis.sqlite')

session = Session(Airbnb_engine)
Base = automap_base()
Base.prepare(Airbnb_engine, reflect=True)
Airbnb_Analysis = Base.classes.Airbnb_Analysis


# DATABASE = 'save_pandas.db'
# def get_db():
#     db = getattr(g, '_database', None)
#     if db is None:
#         db = g._database = sqlite3.connect(DATABASE)
#         db.row_factory = sqlite3.Row
#     return db



#################################################
# Database Setup
#################################################
# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///save_pandas.Airbnb_Analysis"

# # Remove tracking modifications
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# AA = create_classes(db)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
@app.route('/')
@app.route('/home')
def home():

    # Find one record of data from the mongo database
    # Result_Dict = results_collection.find_one()
    # Return template and data
    return render_template('home.html')


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
@app.route('/about')
def about():
    return render_template('about.html')


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #




# @app.teardown_appcontext
# def close_connection(exception):
#     db = getattr(g, '_database', None)
#     if db is not None:
#         db.close()     

@app.route('/maps')
def maps():
    return render_template('maps.html')


@app.route('/generatemapsdata')
def generatemapsdata():
    return jsonify(session.query(Airbnb_Analysis.Host_Name, Airbnb_Analysis.Price, Airbnb_Analysis.City, Airbnb_Analysis.Latitude, Airbnb_Analysis.Longitude).all())

# def price():
#     db = get_db()
#     data = db.execute('SELECT price, latitude, longitude FROM Airbnb_Analysis').fetchall()
    # results = db.session.query(AA.Price, AA.Latitude,AA.Longitude,AA.Host_Name,AA.Room_Type,AA.Neighbourhood,AA.Price_Bins).all()

    # price= [result[5] for result in results]
    # lat = [result[2] for result in results]
    # lon = [result[3] for result in results]
    # name = [result[0] for result in results]
    # room = [result[4] for result in results]
    # neighbour = [result[1] for result in results]
    # bins = [result[12] for result in results]
    # city = [result[11] for result in results]


    # price_data = [{
    #     "type": "scattergeo",
    #     "locationmode": "USA-states",
    #     "lat": lat,
    #     "lon": lon,
    #     "price": price,
    #     "name": name,
    #     "room_type" : room,
    #     "neighbourhood": neighbour,
    #     "bins": bins,
    #     "city": city,
    #     "marker": {
    #         "size": 50,
    #         "line": {
    #             "color": "rgb(8,8,8)",
    #             "width": 1
    #         },
    #     }
    # }]

    # return jsonify(data)




# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
@app.route('/api/veggies', methods=['POST'])
def veggies():
    userInputData = request.json
    return jsonify([userInputData])


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
if __name__ == '__main__':

    # Run this when running on LOCAL server...
    app.run(debug=True)

    # ...OR run this when PRODUCTION server.
    # app.run(debug=False)