# import necessary libraries
import os
from flask import (
    render_template,
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
app.config['TEMPLATES_AUTO_RELOAD'] = True
engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
@app.route("/", methods=["GET"])
def root():
    return render_template("home.html")

@app.route("/index", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/maps", methods=["GET"])
def map():
    return render_template("maps.html")

@app.route("/about", methods=["GET"])
def about():
    return render_template("about.html")

@app.route("/dashboard", methods=["GET"])
def dashboard():
    return render_template("dashboard.html")
# @app.route("/static/css/style.css", methods=["GET"])
# def css_resources():
#     return render_template("static/css/style.css")    

# @app.route("/static/js/logic.js", methods=["GET"])
# def js_resources():
#     return render_template("static/js/logic.js")

# Query the database and send the jsonified results
@app.route("/query", methods=["GET"])
def query():  
    # con = engine.connect()
    # rs = con.execute('select * from Airbnb_Analysis limit 10')
    # a = rs.fetchall()

    results = []
    columns = []
    with engine.connect() as con:

        rs = con.execute('select * from Airbnb_Analysis')
        for col in rs.keys():
            columns.append(col)
            
        for row in rs:
            results.append(dict(zip(columns, row)))
    
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
