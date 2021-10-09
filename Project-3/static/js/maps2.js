fetch('/generatemapsdata')
    .then(response => response.json())
    .then(data => {
        console.log(data)


        // Create the tile layer that will be the background of our map.
        var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        // Create a baseMaps object to hold the streetmap layer.
        var baseMaps = {
            "Street Map": streetmap
        };

        // Create an overlayMaps object to hold the bikeStations layer.
        var overlayMaps = {
            "Hotels": priceData
        };

        // Create the map object with options.
        var map = L.map("map-id", {
            center: [40.73, -74.0059],
            zoom: 12,
            layers: [streetmap, priceData]
        });

        // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(map);
    });

function createMarkers(response) {

    // Pull the "stations" property from response.data.
    var Room_Info = response;

    // Initialize an array to hold bike markers.
    var priceMarkers = [];

    // Loop through the stations array.
    for (var index = 0; index < Room_Info.length; index++) {
        var Room_Info = Room_Info[index];

        // For each station, create a marker, and bind a popup with the station's name.
        var room_details = L.marker([Room_Info.latitude, Room_Info.longitude])
            .bindPopup("<h3>" + Room_Info.Host_Name + "</h3><h3>Price: " + Room_Info.Price + "</h3><h3>Room Type: " + Room_Info.Room_Type + "</h3><h3>City: " + Room_Info.City + "</h3><h3>Minimum Nights: " + Room_Info.Minimum_Nights + "</h3><h3>Reviews: " + Room_Info.Number_Of_Reviews + "</h3>");

        // Add the marker to the bikeMarkers array.
        priceMarkers.push(room_details);
    }

    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(priceMarkers));
}
// d3.geoJSON(data).then(createMarkers);

});