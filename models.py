def create_classes(db):
    class AA(db.Model):
        __tablename__ = 'Airbnb_Analysis'
        __table_args__ = {'extend_existing': True}
        id = db.Column(db.Integer, primary_key=True)
        Host_Name = db.Column(db.String(64))
        Neighbourhood = db.Column(db.String(64))
        Latitude = db.Column(db.String(64))
        Longitude = db.Column(db.String(64))
        Room_Type = db.Column(db.String(64))
        Price = db.Column(db.Float)
        Minimum_Nights = db.Column(db.Float)
        Number_of_Reviews = db.Column(db.Float)
        Reviews_Per_Month = db.Column(db.Float)
        Calculated_Host_Listings_Count = db.Column(db.Float)
        Availability_365 = db.Column(db.Float)
        City = db.Column(db.String(64))
        Price_Bins = db.Column(db.String(64))

        def __repr__(self):
            return '<AA %r>' % (self.Host_Name)
    return AA
    
