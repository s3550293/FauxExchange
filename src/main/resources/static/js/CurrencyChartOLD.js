const e = React.createElement;
var timeFormat = "MM/DD/YYYY HH:mm";
class CurrencyChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            coins: [],
            value: [],
            time: [],
            coin: 'BTC',
            duration: 'minute',
            ctx: document.getElementById('Currency-Chart-Display').getContext('2d'),
            update: true,
            graph: ''
        };

        
    }

    componentDidMount = () => {
        this.fetchData();
        if(this.state.update){
            setTimeout(this.componentDidMount, 5000)
        }
    }

    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

    fetchData = () => {
        const coin = this.state.coin;
        const duration = this.state.duration;
        fetch("https://min-api.cryptocompare.com/data/histo"+duration+"?fsym="+coin+"&tsym=AUD&limit=1000&api_key={9d22b9c8cedc0b279d640ea0dd0268c2bd0d3f0748c910f127f39717fff91382}")
            .then(response => response.json())
            .then(data => this.setState({
                coins: data.Data,
                loading: false
            }));
    }
    convertTime12to24 = (time12h) => {
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

    convertDate(value) {
        var dateTime = new Date(Math.floor(value * 1000))
        var time = this.convertTime12to24(dateTime.toLocaleTimeString());
        var date = dateTime.toLocaleDateString();
        console.log()
        return `${date} ${time}`;
    }

    graphConfig() {
        // this.state.graph.destory();
        this.state.value = [];
        this.state.time = [];
        this.state.coins.map(coin => (
            this.state.value.push(coin.open),
            this.state.time.push(this.convertDate(coin.time))
        ));
    }

    updateView = (event) =>{
        this.state.duration = event.target.value,
        this.fetchData();
    }

    render() {
        // this.state.ctx.onClick(console.log("Graph Clicked"));
        this.graphConfig();
        this.state.graph = new Chart(this.state.ctx, {
            type: "line",
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
                scales: {
                    xAxes: [{
                        type: "time",
                        time: {
                            parser: timeFormat,
                            // round: 'day'
                            tooltipFormat: "ll HH:mm"
                        },
                        ticks: {
                            maxRotation: 0
                        }
                    }],
                },
                animation: {
                    duration: 0
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
            }

        });
        return( 
            <div>
                <button className="button success" onClick={this.updateView} value="Update">Update</button>
                <button className="button warning" onClick={this.updateView} value="day">Day</button>
                <button className="button warning" onClick={this.updateView} value="hour">Hour</button>
                <button className="button warning" onClick={this.updateView} value="minute">Minute</button>
            </div>
            );
    }
}
const windowElement = document.getElementById('Graph-Controls');
ReactDOM.render(e(CurrencyChart), windowElement);