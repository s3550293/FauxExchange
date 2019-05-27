var canvas = document.getElementById('Currency-Chart-Display');
var Graphdata = {
    labels: [],
    datasets: [{
        borderColor: 'rgba(56, 132, 45,0.5)',
        backgroundColor:'rgba(56, 132, 45,0.2)',
        pointHitRadius: 2,
        data: []
    }]
};
var loading = false;
var timeFormat = "MM/DD/YYYY HH:mm";
var jsonData;
var option = {
    elements: {
        point:{
            radius: 1
        }
    },
    maintainAspectRatio: false,
    responsive: true,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [{
            type: "time",
            time: {
                parser: timeFormat,
                tooltipFormat: "ll HH:mm"
            },
            ticks: {
                maxRotation: 0
            }
        }],
    },
    animation: {
        duration: 1000,
        easing: "linear",
    },
    pan: {
        enabled: true,
        mode: "x",
        speed: 10,
        threshold: 10
    },
    zoom: {
        enabled: true,
        drag: false,
        mode: "x",
        limits: {
            max: 10,
            min: 0.5
        }
    }
};
var currencyGraph = Chart.Line(canvas, {
    data: Graphdata,
    options: option
});

document.addEventListener("DOMContentLoaded", function () {
    fetchData(loading);
    // setTimeout(appendData(loading), 10000)
    (function appendData() {
        setTimeout(function () {
            fetchData(loading)
            appendData()
        }, 15000);
    }());
});

function addData(update) {
    if (!update) {
        if (Graphdata.labels.length == 0) {
            for (i in jsonData) {
                if (i != 0) {
                    Graphdata.labels.push(convertDate(jsonData[i].time)),
                        Graphdata.datasets[0].data.push(jsonData[i].value)
                }
            }
            loading = true;
            currencyGraph.update();
        }
    } else {
        if (convertDate(jsonData[jsonData.length - 1].time) != Graphdata.labels[Graphdata.labels.length - 1]) {
            Graphdata.labels.push(convertDate(jsonData[jsonData.length - 1].time)),
                Graphdata.datasets[0].data.push(jsonData[jsonData.length - 1].value)
            currencyGraph.update();
        }
    }
}

function convertTime12to24(time12h){
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}

function convertDate(value) {
    var dateTime = new Date(Math.floor(value * 1000))
    var time = this.convertTime12to24(dateTime.toLocaleTimeString());
    var date = dateTime.toLocaleDateString();
    return `${date} ${time}`;
}

function resetZoom(){
    window.currencyGraph.resetZoom();
}

function fetchData(update) {
    const url_string = window.location.href;
    const url = new URL(url_string);
    fetch('/api/currencies/' + url.searchParams.get("code"))
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function (data) {
                    jsonData = data.price;
                    addData(update);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}