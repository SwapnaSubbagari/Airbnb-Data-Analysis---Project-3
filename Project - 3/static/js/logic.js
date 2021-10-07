// Creating the map object
var myMap = L.map("map", {
  // center: [40.7, -73.95],
  center: [19.41577, -154.96278],

  zoom: 11
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Store the API query variables.
// For docs, refer to https://dev.socrata.com/docs/queries/where.html.
// And, refer to https://dev.socrata.com/foundry/data.cityofnewyork.us/erm2-nwe9.
var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
var date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
var complaint = "&complaint_type=Rodent";
var limit = "&$limit=10000";

// Assemble the API query URL.
var url = baseURL + date + complaint + limit;
url = 'http://localhost:5000/query'
// Get the data with d3.
var res 
d3.json(url).then(function(response) {

  if(1){
    response = response.data

    response = response.map(d =>{
      d.latitude = d.latitude + ''
      d.longitude = d.longitude + ''
  
      return d
    })
    res = response
  }
  
  console.log(response)

  // Create a new marker cluster group.
  var markers = L.markerClusterGroup();

  var heatArray = []
  // Loop through the data.
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable.
    var location = [response[i].latitude, response[i].longitude]
     
    heatArray.push([location[0], location[1], response[i].price]);

    // Add a new marker to the cluster group, and bind a popup.
    markers.addLayer(L.marker([location[0], location[1]])
      .bindPopup(`${response[i].host_name}<br/>$${response[i].price}`));
     

  }

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(myMap);
  myMap.addLayer(markers);

});
