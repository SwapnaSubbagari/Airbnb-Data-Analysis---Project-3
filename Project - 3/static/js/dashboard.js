function dropdownChanged(selectedOption) {

    const data = { 'yesOrNo': selectedOption };

    fetch(`/api/veggies`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            var optionSelected = parseInt(data[0]['yesOrNo'])
            var y_data;
            if (optionSelected == 0) {
                y_data = [1, 4, 5, 3, 4]
            }
            else {
                y_data = [987, 345, 234, 567, 344]
            }
            // BAR CHART
            var trace1 = {
                x: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
                y: y_data,
                marker: {
                },
                type: 'bar'
            };

            var data = [trace1];

            var layout = {
                title: 'Least Used Feature'
            };

            Plotly.newPlot('sampleBarChart', data, layout);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


// BAR CHART
var trace1 = {
    x: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
    y: [20, 14, 23, 25, 22],
    marker: {
    },
    type: 'bar'
};

var data = [trace1];

var layout = {
    title: 'Least Used Feature'
};

Plotly.newPlot('sampleBarChart', data, layout);

