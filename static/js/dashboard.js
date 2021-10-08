const COLORS = [
  { backgroundColor: 'rgba(54, 162, 235, 1)', borderColor: 'rgba(255, 99, 132, 1)' },
  { backgroundColor: 'rgba(255, 99, 132, 1)', borderColor: 'rgba(255, 99, 132, 1)' },
  { backgroundColor: 'rgba(255, 206, 86, 1)', borderColor: 'rgba(255, 99, 132, 1)' },

];
const EAST = 'east coast';
const WEST = 'west coast';
const OTHER = 'other';
/*
'rgba(255, 99, 132, 0.2)',
'rgba(255, 206, 86, 0.2)',
'rgba(75, 192, 192, 0.2)',
'rgba(153, 102, 255, 0.2)',
'rgba(255, 159, 64, 0.2)';
*/
function getColos(index, type, number) {
  const color = COLORS[index] || COLORS[0];
  const r = [];
  for (let i = 0; i < number; i++) {
    r.push(color[type]);
  }
  return r;
}
function groupByRegion(data) {
  const r = {
    [EAST]: [],
    [WEST]: [],
    [OTHER]: [],
  };
  data.forEach((d) => {
    if (d.longitude < -109 && d.longitude > -127) {
      r[WEST].push(d);
    } else if (d.longitude > -84 && d.longitude < -61) {
      r[EAST].push(d);
    } else {
      r[OTHER].push(d);
    }
  });
  return r;
}
fetch('/query')
  .then((res) => res.json())
  .then((res) => res.data)
  .then((res) => {
    const rd = groupByRegion(res);
    const roomTypes = Object.keys(res.reduce((a, c) => {
      a[c.room_type] = 1;
      return a;
    }, {}));
    const countByRegion = [EAST, WEST, OTHER].reduce((a, c) => {
      a[c] = rd[c].length;
      return a;
    }, {});
    const avgPriceByRegion = [EAST, WEST, OTHER].reduce((a, region) => {
      const regionData = {};
      roomTypes.forEach((roomType) => {
        const d = rd[region].filter((e) => e.room_type === roomType);
        regionData[roomType] = d.reduce((total, d1) => total + d1.price, 0) / d.length;
      });
      a[region] = regionData;
      return a;
    }, {});

    console.log(1);
    const typeCount = {};
    const cityCount = {};
    res.forEach((c) => {
      const type = c.room_type;
      const { city } = c;
      if (typeCount[type] === undefined) {
        typeCount[type] = 0;
      }
      if (cityCount[city] === undefined) {
        cityCount[city] = 0;
      }
      cityCount[city] += 1;
      typeCount[type] += 1;
    }, {});
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
            backgroundColor: getColos(i, 'backgroundColor', Object.values(dict).length),
            borderColor: getColos(i, 'borderColor', Object.values(dict).length),
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
    plot('chart2', [typeCount], ['# of properties']);
    plot('chart3', [cityCount], ['# of properties']);

    plot('chart4', [countByRegion], ['# of properties']);
    plot('chart5', Object.values(avgPriceByRegion), Object.keys(avgPriceByRegion));
  });
