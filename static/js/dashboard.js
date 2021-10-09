$(document).ready(() => {
  // Main Graph ( City By Prices)
  $.ajax({
    type: 'GET',
    url: '/getCityPrices',
    dataType: 'json',
    success(response) {
      console.log(response);
      plotCityByPrice(response);
    },
    error(error) {
      console.error(`Error : ${error}`);
    },
  });

  // Side First Graph (Rental Type By Total Count)
  $.ajax({
    type: 'GET',
    url: '/getRentalTypeCount',
    dataType: 'json',
    success(response) {
      console.log(response);
      plotRentalTypeCount(response);
    },
    error(error) {
      console.error(`Error : ${error}`);
    },
  });

  // Side Second Graph (Rental Properties By City Total Count)
  $.ajax({
    type: 'GET',
    url: '/getRentalPropertiesCountByCity',
    dataType: 'json',
    success(response) {
      console.log(response);
      getRentalPropertiesCountByCity(response);
    },
    error(error) {
      console.error(`Error : ${error}`);
    },
  });
});

function plotCityByPrice(data) {
  cities = [];
  pricesPrivate = [];
  pricesEntireHome = [];
  for (var i = 0; i < data.entireHome.length; i++) {
    cities[i] = data.entireHome[i].city;
    pricesEntireHome[i] = data.entireHome[i].price;
  }
  for (var i = 0; i < data.privateRoom.length; i++) {
    pricesPrivate[i] = data.privateRoom[i].price;
  }
  console.log(pricesPrivate);
  console.log(pricesEntireHome);
  const trace1 = {
    x: cities,
    y: pricesPrivate,
    marker: {},
    name: 'Private Room',
    type: 'bar',
  };
  const trace2 = {
    x: cities,
    y: pricesEntireHome,
    marker: {},
    name: 'Entire Home/ Apt ',
    type: 'bar',
  };
  var data = [trace1, trace2];
  const layout = {
    barMode: 'group',
    xaxis: {
      title: 'Cities',
      titlefont: {
        size: 16,
        color: 'rgb(107, 107, 107)',
      },
      tickfont: {
        size: 13,
        color: 'rgb(107, 107, 107)',
      },
    },
    yaxis: {
      title: 'Prices',
      titlefont: {
        size: 13,
        color: 'rgb(107, 107, 107)',
      },
      tickfont: {
        size: 13,
        color: 'rgb(107, 107, 107)',
      },
    },
  };
  Plotly.newPlot('plotCityByPrice', data, layout);
}

function plotRentalTypeCount(data) {
  roomType = [];
  count = [];
  for (let i = 0; i < data.length; i++) {
    roomType[i] = data[i].room_type;
    count[i] = data[i].count;
  }
  const trace = {
    x: count,
    y: roomType,
    marker: {},
    type: 'bar',
    orientation: 'h',
    marker: {
      color: 'rgba(255, 99, 71, 1)',
      width: 1,
    },
  };
  var data = [trace];
  const layout = {
    title: 'Count of Rental Properties By Rental Type',
    xaxis: {
      title: 'Number of Rental Properties',
      titlefont: {
        size: 13,
        color: 'rgb(107, 107, 107)',
      },
      tickfont: {
        size: 13,
        color: 'rgb(107, 107, 107)',
      },
    },
    yaxis: {
      title: 'Rental Type',
      titlefont: {
        size: 13,
        color: 'rgb(107, 107, 107)',
      },
      tickfont: {
        size: 10,
        color: 'rgb(107, 107, 107)',
      },
    },
  };
  Plotly.newPlot('plotRentalTypeCount', data, layout);
}

function getRentalPropertiesCountByCity(data) {
  city = [];
  count = [];
  for (let i = 0; i < data.length; i++) {
    city[i] = data[i].city;
    count[i] = data[i].count;
  }
  const trace = {
    x: count,
    y: city,
    marker: {},
    type: 'bar',
    orientation: 'h',
    marker: {
      color: 'rgba(255, 99, 71, 1)',
      width: 1,
    },
  };
  var data = [trace];
  const layout = {
    title: 'Count of Rental Properties By City',
    xaxis: {
      title: 'Number of Rental Properties',
      titlefont: {
        size: 13,
        color: 'rgb(107, 107, 107)',
      },
      tickfont: {
        size: 13,
        color: 'rgb(107, 107, 107)',
      },
    },
    yaxis: {
      title: 'Cities',
      titlefont: {
        size: 13,
        color: 'rgb(107, 107, 107)',
      },
      tickfont: {
        size: 8,
        color: 'rgb(107, 107, 107)',
      },
    },
  };
  Plotly.newPlot('getRentalPropertiesCountByCity', data, layout);
}

fetch('/getDataByRegion').then((res) => res.json())
  .then((res) => {
    console.log(1, res);
    const COLORS = [
      { backgroundColor: 'rgba(54, 162, 235, 1)', borderColor: 'rgba(255, 99, 132, 1)' },
      { backgroundColor: 'rgba(255, 99, 132, 1)', borderColor: 'rgba(255, 99, 132, 1)' },
      { backgroundColor: 'rgba(255, 206, 86, 1)', borderColor: 'rgba(255, 99, 132, 1)' },

    ];
    function getColors(index, type, number) {
      const color = COLORS[index] || COLORS[0];
      const r = [];
      for (let i = 0; i < number; i++) {
        r.push(color[type]);
      }
      return r;
    }
    function plot(id, list, labels = [], stack = undefined) {
      if (!(list instanceof Array)) {
        list = [list];
      }
      const config = {
        type: 'bar',
        data: {
          labels: Object.keys(list[0]),
          datasets: list.map((dict, i) => ({
            label: labels[i],
            data: Object.values(dict),
            backgroundColor: getColors(i, 'backgroundColor', Object.values(dict).length),
            borderColor: getColors(i, 'borderColor', Object.values(dict).length),
          }))
          ,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              stacked: stack,

            },
            x: {
              stacked: stack,
            },

          },
        },
      };
      const ctx = document.getElementById(id).getContext('2d');
      new Chart(ctx, config);
    }
    // plot('chart2', [typeCount], ['# of properties']);
    // plot('chart3', [cityCount], ['# of properties']);

    plot('chart4', [{
      east: res.count.east,
      west: res.count.west,
      other: res.count.other,
    }], ['# of properties']);
    const dPrice = { east: res.price.east, west: res.price.west, other: res.price.other };
    const d = {};
    Object.entries(dPrice).forEach(([region, regionData]) => {
      d[region] = {};
      for (const roomType in regionData) {
        d[region][roomType] = regionData[roomType].total / regionData[roomType].cnt;
      }
    });
    plot('chart5', Object.values(d), Object.keys(d));
  });
