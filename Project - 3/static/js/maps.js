
// An array that contains all the information needed to create city and state markers

// Define arrays to hold the created city and state markers.
var cityMarkers = [];
var priceMarkers = [];
var locations = [];
var latitude = [];
var longitude = [];
var marker_info = [];
var coordinates = [];

fetch('/generatemapsdata')
    .then(response => response.json())
    .then(data => {
        console.log(data)});

        for (var i = 0; i < data.length; i++) {
            var Room_Details = Room_Info[i];
            latitude = Room_Details[i].Latitude
            longitude = Room_Details[i].Longitude
            coordinates = [latitude,longitude]

        // Setting the marker radius for the state by passing population into the markerSize function
            priceMarkers.push(
                L.circle(coordinates, {
                    stroke: false,
                    fillOpacity: 0.75,
                    color: "white",
                    fillColor: "white",
                    radius: markerSize(Room_Details[i].Price)
                })
            );

            // Set the marker radius for the city by passing the population to the markerSize() function.
            cityMarkers.push(
                L.circle(coordinates, {
                    stroke: false,
                    fillOpacity: 0.75,
                    color: "purple",
                    fillColor: "purple",
                    radius: markerSize(Room_Details[i].City)
                })
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
        var cities = L.layerGroup(cityMarkers);

        // Create a baseMaps object.
        var baseMaps = {
            "Street Map": street,
            "Topographic Map": topo
        };

        // Create an overlay object.
        var overlayMaps = {
            "Price": price,
            "City": cities
        };

        // Define a map object.
        var myMap = L.map("map-id", {
            center: [37.09, -95.71],
            zoom: 5,
            layers: [street, price, cities]
        });

        // Pass our map layers to our layer control.
        // Add the layer control to the map.
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);

    });






// function createMap(priceData) {

//     // Create the tile layer that will be the background of our map.
//     var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     });

//     // Create a baseMaps object to hold the streetmap layer.
//     var baseMaps = {
//         "Street Map": streetmap
//     };

//     // Create an overlayMaps object to hold the bikeStations layer.
//     var overlayMaps = {
//         "Hotels": priceData
//     };

//     // Create the map object with options.
//     var map = L.map("map-id", {
//         center: [40.73, -74.0059],
//         zoom: 12,
//         layers: [streetmap, priceData]
//     });

//     // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
//     L.control.layers(baseMaps, overlayMaps, {
//         collapsed: false
//     }).addTo(map);
// }

// function createMarkers(response) {

//     // Pull the "stations" property from response.data.
//     var Room_Info = response;

//     // Initialize an array to hold bike markers.
//     var priceMarkers = [];

//     // Loop through the stations array.
//     for (var index = 0; index < Room_Info.length; index++) {
//         var Room_Info = Room_Info[index];

//         // For each station, create a marker, and bind a popup with the station's name.
//         var room_details = L.marker([Room_Info.latitude, Room_Info.longitude])
//             .bindPopup("<h3>" + Room_Info.host_name + "</h3><h3>Price: " + Room_Info.price + "</h3><h3>Room Type: " + Room_Info.room_type + "</h3><h3>City: " + Room_Info.city + "</h3><h3>Minimum Nights: " + Room_Info.minimum_nights + "</h3><h3>Reviews: " + Room_Info.number_of_reviews + "</h3>");

//         // Add the marker to the bikeMarkers array.
//         priceMarkers.push(room_details);
//     }

//     // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
//     createMap(L.layerGroup(priceMarkers));
// }


// // Perform  call to the JSON file to get the station information. Call createMarkers when it completes.
// // d3.json("/Project-3/export.json", function (data) {
// //     console.log(data);
// // });
// // 
// d3.json("/static/export.json").then(createMarkers);








// // // Define a function that we want to run once for each feature in the features array.
// // // Give each feature a popup that describes the place and time of the earthquake.
// // function onEachFeature(feature, layer) {
// //     layer.bindPopup(`<h3>${feature.latitude}</h3><hr><p>${feature.longitude}</p>`);
// // }

// // // Create a GeoJSON layer that contains the features array on the priceData object.
// // // Run the onEachFeature function once for each piece of data in the array.
// // var earthquakes = L.geoJSON(priceData, {
// //     onEachFeature: onEachFeature
// // });

// // // Send our earthquakes layer to the createMap function/
// // createMap(earthquakes);
// // }

// // function createMap(earthquakes) {

// //     // Create the base layers.
// //     var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //     })

// //     var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
// //         attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// //     });

// //     // Create a baseMaps object.
// //     var baseMaps = {
// //         "Street Map": street,
// //         "Topographic Map": topo
// //     };

// //     // Create an overlay object to hold our overlay.
// //     var overlayMaps = {
// //         Earthquakes: earthquakes
// //     };

// //     // Create our map, giving it the streetmap and earthquakes layers to display on load.
// //     var myMap = L.map("map", {
// //         center: [
// //             37.09, -95.71
// //         ],
// //         zoom: 5,
// //         layers: [street, earthquakes]
// //     });

// //     // Create a layer control.
// //     // Pass it our baseMaps and overlayMaps.
// //     // Add the layer control to the map.
// //     L.control.layers(baseMaps, overlayMaps, {
// //         collapsed: false
// //     }).addTo(myMap);

// // }

// // //     console.log(response);

// // //     const data = response;

// // //     //     const layout = {
// // //     //         scope: "usa",
// // //     //         title: "Price_View",
// // //     //         showlegend: false,
// // //     //         height: 600,
// // //     //         // width: 980,
// // //     //         geo: {
// // //     //             scope: "usa",
// // //     //             projection: {
// // //     //                 type: "albers usa"
// // //     //             },
// // //     //             showland: true,
// // //     //             landcolor: "rgb(217, 217, 217)",
// // //     //             subunitwidth: 1,
// // //     //             countrywidth: 1,
// // //     //             subunitcolor: "rgb(255,255,255)",
// // //     //             countrycolor: "rgb(255,255,255)"
// // //     //         }
// // //     //     };

// // //     //     Plotly.newPlot("plot", data, layout);
// // //     // });





// // //     // Create earthquake layerGroup
// // //     var price_map = L.layerGroup();

// // //     // Create tile layer
// // //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// // //         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// // //     }).addTo(myMap);


// // //     // var grayscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
// // //     //     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
// // //     //     tileSize: 512,
// // //     //     maxZoom: 18,
// // //     //     zoomOffset: -1,
// // //     //     id: "mapbox/light-v10",
// // //     //     accessToken: API_KEY
// // //     // });

// // //     // Create the map, giving it the grayscaleMap and earthquakes layers to display on load
// // //     var myMap = L.map("mapid", {
// // //         center: [40.81362, -96.7073],
// // //         zoom: 2,
// // //         layers: [grayscaleMap, price_map]
// // //     });

// // //     d3.json(url, function (Price_Data) {
// // //         // Determine the marker size by magnitude
// // //         function markerSize(price) {
// // //             return price * 4;
// // //         };
// // //         // Determine the marker color by Bins
// // //         // function chooseColor(bins) {
// // //         //     switch (true) {
// // //         //         case bins = "100 and below":
// // //         //             return "green";
// // //         //         case bins = "100 to 200":
// // //         //             return "yellow";
// // //         //         case bins > "200 to 400":
// // //         //             return "orange";
// // //         //         case bins > "400 or more":
// // //         //             return "red";
// // //         //         default:
// // //         //             return "lightgreen";
// // //         //     }
// // //         // }

// // //         // Create a GeoJSON layer containing the features array
// // //         // Each feature a popup describing the place and time of the earthquake
// // //         L.geoJSON(Price_Data, {
// // //             pointToLayer: function (latlng) {
// // //                 return L.circleMarker(latlng,
// // //                     // Set the style of the markers based on properties.mag
// // //                     {
// // //                         radius: markerSize(price),
// // //                         fillColor: chooseColor(bins),
// // //                         fillOpacity: 0.7,
// // //                         color: "black",
// // //                         stroke: true,
// // //                         weight: 0.5
// // //                     }
// // //                 );
// // //             },
// // //             onEachFeature: function (latlng) {
// // //                 layer.bindPopup("<h3>Neighbourhood: " + neighbourhood + "</h3><hr><p>Price: "
// // //                     + price + "</p><hr><p>Room Type " + room_type + "</p><hr><p>City " + city + "</p>");
// // //             }
// // //         }).addTo(price_map);
// // //         // Sending our earthquakes layer to the createMap function
// // //         price_map.addTo(myMap);

// // //         // // Add legend
// // //         // var legend = L.control({ position: "bottomright" });
// // //         // legend.onAdd = function () {
// // //         //     var div = L.DomUtil.create("div", "info legend"),
// // //         //         depth = [-10, 10, 30, 50, 70, 90];

// // //         //     div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"
// // //         //     for (var i = 0; i < depth.length; i++) {
// // //         //         div.innerHTML +=
// // //         //             '<i style="background:' + chooseColor(depth[i] + 1) + '"></i> ' +
// // //         //             depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
// // //         //     }
// // //         //     return div;
// // //         // };
// // //         // legend.addTo(myMap);
// // //     })
// // // });