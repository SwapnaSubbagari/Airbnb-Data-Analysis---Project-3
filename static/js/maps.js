cityMap = [{
  city: 'New York',
  lat: 40.71427,
  lon: -74.00597,
},
{
  city: 'Los Angeles',
  lat: 34.05223,
  lon: -118.24368,
},
{
  city: 'Hawaii',
  lat: 19.896767,
  lon: -155.582779,
},
{
  city: 'San Diego',
  lat: 32.71533,
  lon: -117.15726,
},
{
  city: 'Broward County',
  lat: 26.15,
  lon: -80.478,
},
{
  city: 'Austin',
  lat: 30.26715,
  lon: -97.74306,
},
];
// Define arrays to hold the created city and state markers.
const reviewMarkers = [];
const priceMarkers = [];
const availMarkers = [];
const locations = [];
let latitude = [];
let longitude = [];
const marker_info = [];
let coordinates = [];
let myMap;
function favTutorial() {
  const dropDown = document.getElementById('myList');
  const selectedValue = dropDown.options[dropDown.selectedIndex].text;
  let data = {};
  console.log(selectedValue);
  for (let i = 0; i < cityMap.length; i++) {
    console.log(cityMap[i].city);
    if (cityMap[i].city == selectedValue) {
      data = cityMap[i];
    }
  }
  $.ajax({
    type: 'GET',
    url: `/getRentalPropeties?cityName=${selectedValue}`,
    dataType: 'json',
    success(response) {
      console.log(response);
      plotMap(response, data);
    },
    error(error) {
      console.error(`Error : ${error}`);
    },
  });
}
$(document).ready(() => {
  favTutorial();
});
function plotMap(data, cityVal) {
  const markers = L.markerClusterGroup();
  const arrHeatPrice = [];
  const arrHeatReviews = [];
  const arrHeatAvail = [];

  for (let i = 0; i < data.length; i++) {
    latitude = data[i].latitude;
    longitude = data[i].longitude;
    coordinates = [latitude, longitude];
    // Setting the marker radius for the state by passing population into the markerSize function
    priceMarkers.push(
      L.circle(coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: 'black',
        fillColor: 'black',
        radius: markerSize(data[i].price),
      }).bindPopup(`<h5> Host_Name : ${data[i].host_name}</h5><h5> Price : ${data[i].price}</h5><h5> Number of Reviews : ${data[i].number_of_reviews}</h5>`),
    );
    const marker = L.marker(coordinates);
    marker.bindPopup(`<h5> Host_Name : ${data[i].host_name}</h5><h5> Price : ${data[i].price}</h5><h5> Number of Reviews : ${data[i].number_of_reviews}</h5>`);
    marker.on('mouseover', function (e) {
      this.openPopup();
    });
    marker.on('mouseout', function (e) {
      this.closePopup();
    });
    markers.addLayer(marker);

    arrHeatPrice.push([coordinates[0], coordinates[1], data[i].price]);
    arrHeatReviews.push([coordinates[0], coordinates[1], data[i].number_of_reviews]);
    arrHeatAvail.push([coordinates[0], coordinates[1], data[i].availability_365]);
  }
  // Create the base layers.
  const street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
  const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  });

  // Create two separate layer groups: one for the city markers and another for the state markers.
  const heatPriceLayer = L.heatLayer(arrHeatPrice, {
    radius: 20,
    blur: 35,
  });
  const heatReviewsLayer = L.heatLayer(arrHeatReviews, {
    radius: 20,
    blur: 35,
  });
  const heatAvailLayer = L.heatLayer(arrHeatAvail, {
    radius: 20,
    blur: 35,
  });

  // Create a baseMaps object.
  const baseMaps = {
    'Street Map&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;': street,
    'Topographic Map': topo,
  };
    // Create an overlay object.
  const overlayMaps = {
    'Price&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;': heatPriceLayer,
    'Reviews&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;': heatReviewsLayer,
    'Availability&nbsp;&nbsp;&nbsp&nbsp;&nbsp;': heatAvailLayer,
  };
  const lat = parseFloat(cityVal.lat);
  const lon = parseFloat(cityVal.lon);
  if (myMap != undefined) myMap.remove();
  // Define a map object.
  myMap = new L.map('map-id', {
    center: [lat, lon],
    zoom: 8,
    layers: [street, markers, heatPriceLayer],
  });
  console.log(`${typeof (lat)}\t${lat}`);
  // Pass our map layers to our layer control.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false,
  }).addTo(myMap);
  myMap.invalidateSize();
}
function markerSize(data) {
  return Math.sqrt(data) * 40;
}
