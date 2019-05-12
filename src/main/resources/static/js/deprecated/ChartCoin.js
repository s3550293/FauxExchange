const e = React.createElement;
var timeFormat = "MM/DD/YYYY HH:mm";

class ChartCoin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            coins: [],
            value: [],
            time: [],
            config: null
        };
    }

    //Fetchs from rest API
    async componentDidMount() {
        this.interval = setInterval(() => {
        // var i;
        const url = "https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=AUD&limit=30&api_key={9d22b9c8cedc0b279d640ea0dd0268c2bd0d3f0748c910f127f39717fff91382}";
        // const response = await fetch(url);
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({coins: data.Data, loading: false})), 10000
        });
    }

    convertDate(value) {
        var date, month;
        date = new Date(value * 10000);
        // date.format(timeFormat)
        return date;
    }

    graphConfig() {
        this.state.coins.map(coin => (
            this.state.value.push(coin.open),
            this.state.time.push(this.convertDate(coin.time))
        ));
        this.state.config;
    }

    // https://codepen.io/marcusvilete/pen/EEpKMx
    render() {
        this.graphConfig();
        //Sets render to loading if coin array doesn't have data.\
        var ctx = document.getElementById('Currency-Chart-Display').getContext('2d');
        ctx.height = 500;
        var graph = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.state.time,
                datasets: [{
                    label: 'BTC',
                    data: this.state.value,
                    backgroundColor: [
                        'rgba(0, 128, 0, 0.2)'
                    ],
                    borderColor: [
                        'rgba(0, 150, 0, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                // title: {
                //     display: true,
                //     text: "Chart.js Time Scale"
                // },
                scales: {
                    xAxes: [{
                        type: "time",
                        time: {
                            format: timeFormat,
                            // round: 'day'
                            tooltipFormat: "ll HH:mm"
                        },
                        scaleLabel: {
                            display: true,
                        },
                        ticks: {
                            maxRotation: 0
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                        }
                    }]
                },
            },
            plugins: {
                zoom: {
                    // Container for pan options
                    pan: {
                        // Boolean to enable panning
                        enabled: true,

                        // Panning directions. Remove the appropriate direction to disable
                        // Eg. 'y' would only allow panning in the y direction
                        mode: 'x',
                        rangeMin: {
                            // Format of min pan range depends on scale type
                            x: null,
                            y: null
                        },
                        rangeMax: {
                            // Format of max pan range depends on scale type
                            x: null,
                            y: null
                        },
                        // Function called once panning is completed
                        // Useful for dynamic data loading
                        onPan: function ({
                            chart
                        }) {
                            console.log(`I was panned!!!`);
                        }
                    },

                    // Container for zoom options
                    zoom: {
                        // Boolean to enable zooming
                        enabled: true,

                        // Enable drag-to-zoom behavior
                        drag: true,

                        // Drag-to-zoom rectangle style can be customized
                        // drag: {
                        // 	 borderColor: 'rgba(225,225,225,0.3)'
                        // 	 borderWidth: 5,
                        // 	 backgroundColor: 'rgb(225,225,225)'
                        // },

                        // Zooming directions. Remove the appropriate direction to disable
                        // Eg. 'y' would only allow zooming in the y direction
                        mode: 'xy',

                        rangeMin: {
                            // Format of min zoom range depends on scale type
                            x: null,
                            y: null
                        },
                        rangeMax: {
                            // Format of max zoom range depends on scale type
                            x: null,
                            y: null
                        },

                        // Speed of zoom via mouse wheel
                        // (percentage of zoom on a wheel event)
                        speed: 0.1,

                        // Function called once zooming is completed
                        // Useful for dynamic data loading
                        onZoom: function ({
                            chart
                        }) {
                            console.log(`I was zoomed!!!`);
                        }
                    }
                }
            }
        });
        return (
            null
        );
    }
}
const windowElement = document.getElementById('Currency-Chart-Display');
ReactDOM.render(e(ChartCoin), windowElement);