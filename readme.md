# Airbnb Preferences in Major Cities

![Airbnb](static/images/Trivago-Adds-HomeAway-Vacation-Rentals-.jpg.PNG

## Contents

1-Background
2-Purpose and Proposed Visualization Strategies
3-Data Source
4-Dataset and Variables
5-ETL process
6-Technologies used in the project
7-Website with Visualization
8-home
9-Dashboard
10- Maps
11-Chart
12-About

## Background

Since its inception in 2008, Airbnb has disrupted the travel industry. Today tourists have begun to prefer accommodations that resemble their own home (e.g., multiple bedrooms, stove, grill, and private parking). In most cases, these locations are preferred over that of a traditional hotel.

## Purpose and Proposed Visualization Strategies

The purpose of this project was to tell a story of Airbnb accommodations using data visualizations. Here, we propose to use visualizations to graphically display different filters based on price points, cities, and room types. In addition, we propose to use both plotly heatmap and cluster graphing strategies to display bookings that may differ by price points, cities, and room type.

Overall, these data allow potential travelers to identify high-value locations at the right price point.

## Data Source

The Airbnb data were downloaded from [kaggle](https://www.kaggle.com/kritikseth/us-airbnb-open-data). These data were compiled by [Kritik Seth](https://github.com/kritikseth), an inspiring data scientist from Mumbai, India. The data was compiled from multiple Airbnb datasets in October of 2020. We downloaded it as CSV data file and converted it into a JSON format.

## Dataset and Variables

The original datasets were such a large. it was over 34 KB. After cleaning we have little more than 10 KB. Varaibles such as Id, name, host_id and some states are not longer available in our dataset.

*id: Unique Listing ID
*name: Name of Listing
*host_id: Unique host ID
*host_name: Name of host
*neighborhood_group: Group in which the neighborhood lies
*neighborhood: name of neighborhood
*latitude: Latitude of listing
*longitude: Longitude of listing
*room_type: room type
*price: price of listing per night
*minimum_nights: Minimum number of nights required to book
*number_of_reviews: Total number of reviews on listing
*last_review: Date on which listing received its last review
*reviews_per_month: Average reviews pr month on listing
\*calculated_host_listings_count: Total number of listings by host

## ETL process

With jupyter notbook, clean our data.our final data had over 218, 000 unique rows and 17columns. we start by dropping id,name, host_id,neighbourhood_group, last_review and any duplcate latitude and longitude we can have. our final dataset contained 12 columns and 165,733 rows. Based on our interest, we decided to move on with only the top 14 cities and the top 150 records of our primary dataset. we calculted average and median of price availability and number of review in new dataframe. then some plot to show the number and the type (hotel room, shared room, private room, entire home/apt) of airbnb rental place in each city. we did bins for price also. Once finish cleaning, we were able to load the dataset to SQLite for Exploratory Analysis.

## Technologies used in the project

For the proposed project, we will be using the following software:
*libraries : D3, Plotly, Leaflet, pandas, chart.js, Jquery.js
*Deployment : Heroku, Flask
\*Database : sqlite
\*Languages : Python, Javascript, HTML, CSS \* jupyter notebook

## Website with Visualization

we use flask to set the routes and heroku to deploy our website. Each Icon : Home, Dasboard, maps, charts about represents a link to a another page.

## home

The page display the project name and the team memebers names with picture of the beach in the background.
![home](static/images/IMG_1612.jpeg)

## Dashboard

![dash](static/images/dash.PNG)
The plot in the page shows the number of rental propeties based on type (shared room, private room, hotel room, entire home/apt). We can aslo see the number of properties by cities. the top 3 of cities with more properties is New York City, Los Angeles, Hawaii and the entire home/apt is far the most properties proposed on airbnb in those cities. And the plot of the average price of private room and entire home/apt.
![dashb](static/images/dashb.PNG)

## Maps

The heatmap has street and topographic layers with price, reviews and avalaibility markers and dropdown button that allows to navigate through the top 5 cities. For example, if you zoom in on each city, there is a heatmap by price, reviews, and availability.Zoom in a little more and there is a cluster number of properties in the area. Also if you mouse over the property, you can see more detailed information about the property.

![heatmap](static/images/heatmap.PNG)

## chart

those shows two maps display the count or frequency of rental properties by region and the average of price based on type of room by region.
![charto](static/images/Chart2.PNG)

## About

![about](static/images/about.PNG)

#### [Yawavi Koudjonou](https://github.com/yawavi92)

#### [Ling Lu](https://github.com/LingLv-git)

#### [Raheem Paxton](https://github.com/rjpaxtondata)

#### [Swapna Subbagari](https://github.com/SwapnaSubbagari)
