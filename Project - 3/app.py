# import necessary libraries
import os
from flask import (
    Flask)
from sqlalchemy import create_engine

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///save_pandas.db"

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])

# Query the database and send the jsonified results
@app.route("/query", methods=["GET"])
def query():  
    # con = engine.connect()
    # rs = con.execute('select * from Airbnb_Analysis limit 10')
    # a = rs.fetchall()

    results = []
    columns = []
    with engine.connect() as con:

        rs = con.execute('select * from Airbnb_Analysis limit 100')
        for col in rs.keys():
            columns.append(col)
            
        for row in rs:
            print(row)
            results.append(dict(zip(columns, row)))
     # results = db.session.query(Pet.name, Pet.lat, Pet.lon).all()
    
    return {
        'data': results
    }

''' # not in use
@app.route("/api/pals")
def pals():
    results = db.session.query(Pet.name, Pet.lat, Pet.lon).all()

    hover_text = [result[0] for result in results]
    lat = [result[1] for result in results]
    lon = [result[2] for result in results]

    pet_data = [{
        "type": "scattergeo",
        "locationmode": "USA-states",
        "lat": lat,
        "lon": lon,
        "text": hover_text,
        "hoverinfo": "text",
        "marker": {
            "size": 50,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
        }
    }]

    return jsonify(pet_data)
'''

if __name__ == "__main__":
    app.run()
