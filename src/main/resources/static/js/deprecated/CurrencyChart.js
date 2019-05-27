const e = React.createElement;
var timeFormat = "MM/DD/YYYY HH:mm";
class CurrencyChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: 0,
            coins: [],
            value: [],
            time: [],
            coin: 'BTC',
            duration: 'hour',
            graphData: ''
        };
    }

    componentDidMount = () => {
        if(this.state.state == 0){
            const url_string = window.location.href;
            const url = new URL(url_string);
            this.setState({
                coin: url.searchParams.get("code"),
                loading: false,
                state: 1
            })
            setTimeout(this.componentDidMount, 500);
        }else if(this.state.state == 1){
            console.log("Grabbing Data");
            const coin = this.state.coin;
            // const duration = this.state.duration;
            // fetch("https://min-api.cryptocompare.com/data/histo"+duration+"?fsym="+coin+"&tsym=AUD&limit=100&api_key={9d22b9c8cedc0b279d640ea0dd0268c2bd0d3f0748c910f127f39717fff91382}")
            fetch("http://fauxexchange.tk/api/currencies/"+coin)
            .then(response => response.json())
            .then(data => this.setState({
                coins: data.price,
                state: 2
            }, () =>{
                this.setState({graphData: this.graphData()})
            }));
            setTimeout(this.componentDidMount, 1000);
        }else if(this.state.state == 2){
            const coin = this.state.coin;
            fetch("http://fauxexchange.tk/api/currencies/"+coin)
            .then(response => response.json())
            .then(data => this.setState({
                coins: data.price,
            })).then(this.updateData());
            setTimeout(this.componentDidMount, 3000);
        }
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
        return `${date} ${time}`;
    }

    graphConfig = () => {
        this.state.value = [];
        this.state.time = [];
        this.state.coins.map(cent => (
            this.state.value.push(cent.value),
            this.state.time.push(this.convertDate(cent.time))
            // this.state.time.push(cent.time)
        ));
    }

    graphData = () => {
        console.log("Enter");
        this.graphConfig();
        var config = {
                labels: this.state.time,
                datasets: [{
                    label: this.state.coin,
                    data: this.state.value,
                    backgroundColor: [
                        'rgba(0, 128, 0, 0.2)'
                    ],
                    borderColor: [
                        'rgba(0, 150, 0, 1)'
                    ],
                    borderWidth: 1
                }]
           }
        return config;
    }

    updateData = () => {
        console.log(this.state.graphData);
    }

    // updateView = (event) =>{
    //     this.setState({
    //         duration: event.target.value,
    //     })
    // }
    render() {
        if(this.state.loading){
            return(
                null
            );
        } else {
            // .getContext('2d')
            // console.log(this.graphData)
            var ctx = document.getElementById('Currency-Chart-Display');
            var graph = new Chart.Line(ctx, {
                data: this.state.graphData,
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
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
                    <button className="button warning" onClick={graph.resetZoom()} value="day">Reset View</button>
                </div>
                );
        }
    }
}
const windowElement = document.getElementById('Graph-Controls');
ReactDOM.render(e(CurrencyChart), windowElement);