cityMap = [{
    "city": "New York",
    "lat": 40.71427,
    "lon": -74.00597
},
{
    "city": "Los Angeles",
    "lat": 34.05223,
    "lon": -118.24368
},
{
    "city": "Hawaii",
    "lat": 19.896767,
    "lon": -155.582779
},
{
    "city": "San Diego",
    "lat": 32.71533,
    "lon": -117.15726
},
{
    "city": "Broward County",
    "lat": 26.15,
    "lon": -80.478
},
{
    "city": "Austin",
    "lat": 30.26715,
    "lon": -97.74306
},
]
// Define arrays to hold the created city and state markers.
var reviewMarkers = [];
var priceMarkers = [];
var availMarkers = [];
var locations = [];
var latitude = [];
var longitude = [];
var marker_info = [];
var coordinates = [];
var myMap;
function favTutorial() {
    var dropDown = document.getElementById("myList");
    var selectedValue = dropDown.options[dropDown.selectedIndex].text;
    var data = {}
    console.log(selectedValue);
    for (var i = 0; i < cityMap.length; i++) {
        console.log(cityMap[i]['city'])
        if (cityMap[i]['city'] == selectedValue) {
            data = cityMap[i];
        }
    }
    console.log(data)
    $(document).ready(function () {
        // Main Graph ( City By Prices)
        $.ajax({
            type: "GET",
            url: "/getRentalPropeties?cityName=" + selectedValue,
            dataType: "json",
            success: function (response) {
                console.log(response);
                plotMap(response, data);
            },
            error: function (error) {
                console.error("Error : " + error);
            }
        });
    });
}
function plotMap(data, cityVal) {
    for (var i = 0; i < data.length; i++) {
        latitude = data[i]['latitude'];
        longitude = data[i]['longitude'];
        coordinates = [latitude, longitude]
        // Setting the marker radius for the state by passing population into the markerSize function
        priceMarkers.push(
            L.circle(coordinates, {
                stroke: false,
                fillOpacity: 0.75,
                color: "black",
                fillColor: "black",
                radius: markerSize(data[i]['price'])
            }).bindPopup("<h5> Host_Name : " + data[i]['host_name'] + "</h5><h5> Price : " + data[i]['price'] + "</h5><h5> Number of Reviews : " + data[i]['number_of_reviews'] + "</h5>")
        );
        // Set the marker radius for the city by passing the population to the markerSize() function.
        reviewMarkers.push(
            L.circle(coordinates, {
                stroke: false,
                fillOpacity: 0.75,
                color: "purple",
                fillColor: "purple",
                radius: markerSize(data[i]['number_of_reviews'])
            }).bindPopup("<h5> No Of Reviews : " + data[i]['number_of_reviews'] + "</h5>")
        );
        availMarkers.push(
            L.circle(coordinates, {
                stroke: false,
                fillOpacity: 0.75,
                color: "green",
                fillColor: "green",
                radius: markerSize(data[i]['availability_365'])
            }).bindPopup("<h5> Availability : " + data[i]['availability_365'] + "</h5>")
        );
    }
    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    // Create two separate layer groups: one for the city markers and another for the state markers.
    var price = L.layerGroup(priceMarkers);
    var reviews = L.layerGroup(reviewMarkers);
    var availability = L.layerGroup(availMarkers);
    // Create a baseMaps object.
    var baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
    };
    // Create an overlay object.
    var overlayMaps = {
        "Price": price,
        "Reviews": reviews,
        "Availability": availability
    };
    lat = parseFloat(cityVal['lat']);
    lon = parseFloat(cityVal['lon']);
    if (myMap != undefined) myMap.remove();
    // Define a map object.
    myMap = new L.map("map-id", {
        center: [lat, lon],
        zoom: 8,
        layers: [street, price, reviews, availability]
    });
    console.log(typeof (lat) + "\t" + lat)
    // Pass our map layers to our layer control.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
    myMap.invalidateSize();
}
function markerSize(data) {
    return Math.sqrt(data) * 40;
}