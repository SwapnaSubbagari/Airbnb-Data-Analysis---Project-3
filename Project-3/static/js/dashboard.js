$(document).ready(function() {

    // Main Graph ( City By Prices)
    $.ajax({
        type: "GET",
        url: "/getCityPrices",
        dataType: "json",
        success: function(response) {
            console.log(response);
            plotCityByPrice(response);
        },
        error: function(error) {
            console.error("Error : " + error);
        }
    });


    // Side First Graph (Rental Type By Total Count)
    $.ajax({
        type: "GET",
        url: "/getRentalTypeCount",
        dataType: "json",
        success: function(response) {
            console.log(response);
            plotRentalTypeCount(response);
        },
        error: function(error) {
            console.error("Error : " + error);
        }
    });


    // Side Second Graph (Rental Properties By City Total Count)
    $.ajax({
        type: "GET",
        url: "/getRentalPropertiesCountByCity",
        dataType: "json",
        success: function(response) {
            console.log(response);
            getRentalPropertiesCountByCity(response);
        },
        error: function(error) {
            console.error("Error : " + error);
        }
    });
});

function plotCityByPrice(data) {
    cities = []
    pricesPrivate = []
    pricesEntireHome = []
    for (var i = 0; i < data['entireHome'].length; i++) {
        cities[i] = data['entireHome'][i]['city'];
        pricesEntireHome[i] = data['entireHome'][i]['price'];
    }
    for (var i = 0; i < data['privateRoom'].length; i++) {
        pricesPrivate[i] = data['privateRoom'][i]['price'];
    }
    console.log(pricesPrivate);
    console.log(pricesEntireHome);
    var trace1 = {
        x: cities,
        y: pricesPrivate,
        marker: {},
        name: 'Private Room',
        type: 'bar'
    };
    var trace2 = {
        x: cities,
        y: pricesEntireHome,
        marker: {},
        name: 'Entire Home/ Apt ',
        type: 'bar'
    };
    var data = [trace1, trace2];
    var layout = {
        title: 'Price by City',
        barMode: 'group',
        xaxis: {
            title: 'Cities',
            titlefont: {
                size: 16,
                color: 'rgb(107, 107, 107)'
            },
            tickfont: {
                size: 13,
                color: 'rgb(107, 107, 107)'
            }
        },
        yaxis: {
            title: 'Prices',
            titlefont: {
                size: 13,
                color: 'rgb(107, 107, 107)'
            },
            tickfont: {
                size: 13,
                color: 'rgb(107, 107, 107)'
            }
        },
    };
    Plotly.newPlot('plotCityByPrice', data, layout);
}


function plotRentalTypeCount(data) {
    roomType = []
    count = []
    for (var i = 0; i < data.length; i++) {
        roomType[i] = data[i]['room_type'];
        count[i] = data[i]['count'];
    }
    var trace = {
        x: count,
        y: roomType,
        marker: {},
        type: 'bar',
        orientation: 'h',
        marker: {
            color: 'rgba(255, 99, 71, 1)',
            width: 1
        },
    };
    var data = [trace];
    var layout = {
        title: 'Count of Rental Properties By Rental Type',
        xaxis: {
            title: 'Number of Rental Properties',
            titlefont: {
                size: 13,
                color: 'rgb(107, 107, 107)'
            },
            tickfont: {
                size: 13,
                color: 'rgb(107, 107, 107)'
            }
        },
        yaxis: {
            title: 'Rental Type',
            titlefont: {
                size: 13,
                color: 'rgb(107, 107, 107)'
            },
            tickfont: {
                size: 10,
                color: 'rgb(107, 107, 107)'
            }
        },
    };
    Plotly.newPlot('plotRentalTypeCount', data, layout);
}

function getRentalPropertiesCountByCity(data) {
    city = []
    count = []
    for (var i = 0; i < data.length; i++) {
        city[i] = data[i]['city'];
        count[i] = data[i]['count'];
    }
    var trace = {
        x: count,
        y: city,
        marker: {},
        type: 'bar',
        orientation: 'h',
        marker: {
            color: 'rgba(255, 99, 71, 1)',
            width: 1
        },
    };
    var data = [trace];
    var layout = {
        title: 'Count of Rental Properties By City',
        xaxis: {
            title: 'Number of Rental Properties',
            titlefont: {
                size: 13,
                color: 'rgb(107, 107, 107)'
            },
            tickfont: {
                size: 13,
                color: 'rgb(107, 107, 107)'
            }
        },
        yaxis: {
            title: 'Cities',
            titlefont: {
                size: 13,
                color: 'rgb(107, 107, 107)'
            },
            tickfont: {
                size: 8,
                color: 'rgb(107, 107, 107)'
            }
        },
    };
    Plotly.newPlot('getRentalPropertiesCountByCity', data, layout);
}