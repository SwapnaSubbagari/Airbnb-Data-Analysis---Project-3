from logging import Logger
import logging
import sqlite3
from flask import (Flask, json, render_template, jsonify, redirect, request, g)
import flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
import sqlite3
import pandas as pd
import csv

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


Airbnb_engine = create_engine('sqlite:///Airbnb_Analysis.sqlite')

session = Session(Airbnb_engine)
Base = automap_base()
Base.prepare(Airbnb_engine, reflect=True)


#################################################
# New Code
#################################################

# https://github.com/SwapnaSubbagari/Airbnb-Data-Analysis---Project-3/blob/main/Project%20-%203/static/js/logic.js
def open_db():
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    # load the data into a Pandas DataFrame
    users = pd.read_csv(r"Airbnb.csv")
    # write the data to a sqlite table
    users.to_sql('data', conn, if_exists='replace', index = False)

open_db()

@app.route('/getCityPrices')
def getCityPricesByPrivate():
    conn = sqlite3.connect('data.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    dataPrivate = c.execute('''SELECT city,AVG(price) AS total_price FROM data  WHERE room_type='Private room' GROUP BY city ''').fetchall()
    resp = []
    respPrivate = []
    respHome = []
    app.logger.info(dataPrivate)
    for row in dataPrivate:
        jsonData = {}
        jsonData["city"] = row["city"]
        jsonData["price"] = row["total_price"]
        respPrivate.append(jsonData)
    
    dataHome = c.execute('''SELECT city,AVG(price) AS total_price FROM data  WHERE room_type='Entire home/apt' GROUP BY city ''').fetchall()
    conn.close()
    resp = {}
    app.logger.info(dataHome)
    for row in dataHome:
        jsonData = {}
        jsonData["city"] = row["city"]
        jsonData["price"] = row["total_price"]
        respHome.append(jsonData)
    
    resp = {"privateRoom":respPrivate,"entireHome":respHome}
    
    return jsonify(resp)




@app.route('/getRentalTypeCount')
def getRentalTypeCount():
    conn = sqlite3.connect('data.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    data = c.execute('''SELECT room_type, COUNT(*) AS count FROM data  GROUP BY room_type ORDER BY count DESC ''').fetchall()
    conn.close()
    resp = []
    app.logger.info(data)
    for row in data:
        jsonData = {}
        jsonData["room_type"] = row["room_type"]
        jsonData["count"] = row["count"]
        resp.append(jsonData)
    return jsonify(resp)

@app.route('/getRentalPropertiesCountByCity')
def getRentalPropertiesCountByCity():
    conn = sqlite3.connect('data.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    data = c.execute('''SELECT city, COUNT(*) AS count FROM data  GROUP BY city ORDER BY count DESC ''').fetchall()
    conn.close()
    resp = []
    app.logger.info(data)
    for row in data:
        jsonData = {}
        jsonData["city"] = row["city"]
        jsonData["count"] = row["count"]
        resp.append(jsonData)
    return jsonify(resp)

@app.route('/getRentalPropeties')
def getRentalPropeties():
    cityName = request.args.get('cityName',default='Austin',type=str)
    conn = sqlite3.connect('data.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    data = c.execute("SELECT * FROM data WHERE city= ? ORDER BY number_of_reviews DESC LIMIT 200",(cityName,)).fetchall()
    conn.close()
    resp = []
    app.logger.info(cityName)
    for row in data:
        jsonData = {}
        jsonData["host_name"] = row["host_name"]
        jsonData["latitude"] = row["latitude"]
        jsonData["longitude"] = row["longitude"]
        jsonData["room_type"] = row["room_type"]
        jsonData["price"] = row["price"]
        jsonData["availability_365"] = row["availability_365"]
        jsonData["number_of_reviews"] = row["number_of_reviews"]
        resp.append(jsonData)
    return jsonify(resp)

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

@app.route('/maps')
def maps():
    return render_template('maps.html')


@app.route('/generatemapsdata')
def generatemapsdata():
    app.logger.log((session.query(Airbnb_Analysis.Host_Name, Airbnb_Analysis.Price, Airbnb_Analysis.City, Airbnb_Analysis.Latitude, Airbnb_Analysis.Longitude).all()),1)
    return "render_template('maps.html')"


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

 
engine = create_engine("sqlite:///data.db")
count_by_region = {
            'east': 0,
            'west': 0,
            'other': 0
        }
price_by_region = {
            'east': {},
            'west': {},
            'other': {}
        }        
def preProcess():
    results = []
    columns = []
    with engine.connect() as con:
        
        rs = con.execute('select * from data')
        # rs = con.execute('select * from Airbnb_Analysis ')
        for col in rs.keys():
            columns.append(col)      
        for row in rs:
            d = dict(zip(columns, row))
            region = 'other'
            if d['longitude'] < -109 and d['longitude'] > -127:
                region = 'west'
                count_by_region[region] += 1
            elif (d['longitude'] > -84 and d['longitude'] < -61) :
                region = 'east'
                count_by_region[region] += 1
            else:
                count_by_region[region] += 1


            dic_region = price_by_region[region]
            room_type = d['room_type']
            if dic_region.get(room_type) is None:
                dic_region[room_type] = { 'total': 0, 'cnt': 0 }
            room_data = dic_region[room_type]
            room_data['cnt'] += 1
            room_data['total'] += d['price']
            
            '''
  const avgPriceByRegion = [EAST, WEST, OTHER].reduce((a, region) => {
      const regionData = {};
      roomTypes.forEach((roomType) => {
        const d = rd[region].filter((e) => e.room_type === roomType);
        regionData[roomType] = d.reduce((total, d1) => total + d1.price, 0) / d.length;
      });
      a[region] = regionData;
      return a;
    }, {});


        '''    
    return
preProcess()
@app.route('/getDataByRegion')
def getDataByRegion():
    
    return jsonify({
        'count': count_by_region,
        'price': price_by_region
    })



# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
if __name__ == '__main__':

    # Run this when running on LOCAL server...
    app.run(debug=True)

    # ...OR run this when PRODUCTION server.
    # app.run(debug=False)
