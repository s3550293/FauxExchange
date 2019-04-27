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
        var i;
        const url = "https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=AUD&limit=30&api_key={9d22b9c8cedc0b279d640ea0dd0268c2bd0d3f0748c910f127f39717fff91382}";
        const response = await fetch(url);
        const data = await response.json();
        var date;
        var month;
        
        this.setState({coins: data.Data, loading: false})
    }

    convertDate(value) {
        var date, month;
        date = new Date(value * 10000);
        // date.format(timeFormat)
        return date;
    }

    graphConfig(){
        this.state.coins.map(coin => (
            this.state.value.push(coin.open),
            this.state.time.push(this.convertDate(coin.time))
        ));
        this.state.config = {
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
                responsive: true,
                title: {
                    display: true,
                    text: "Chart.js Time Scale"
                },
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
                            labelString: "Date"
                        },
                        ticks: {
                            maxRotation: 0
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "value"
                        }
                    }]
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
                    mode: "xy",
                    limits: {
                        max: 10,
                        min: 0.5
                    }
                }
            }
        };
    }

// https://codepen.io/marcusvilete/pen/EEpKMx
    render() {
        this.graphConfig();
        //Sets render to loading if coin array doesn't have data.
        if(this.state.loading){
            return <h1>loading...</h1>
        }else{
            var ctx = document.getElementById('myChart').getContext('2d');
            var graph = new Chart(ctx, this.state.config);

        }
        return(
            null
        );
    }
}
const windowElement = document.getElementById('Currency-Graph');
ReactDOM.render(e(ChartCoin), windowElement);