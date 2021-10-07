fetch('/query')
  .then((res) => res.json())
  .then((res) => res.data)
  .then((res) => {
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
    function plot(id, dict) {
      const config = {
        type: 'bar',
        data: {
          labels: Object.keys(dict),
          datasets: [{
            label: '# of properties',
            data: Object.values(dict),
            backgroundColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };
      const ctx = document.getElementById(id).getContext('2d');
      new Chart(ctx, config);
    }
    plot('chart2', typeCount);
    plot('chart3', cityCount);

    // plot count of rental by city
  });
