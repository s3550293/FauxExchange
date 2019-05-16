const e = React.createElement;
class CurrenciesInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            coin: '',
        };
    }
    getUrlVars = () =>{
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars.code;
    }

    componentDidMount = () => {
        if(this.state.loading){
            this.setState({
                coin: this.getUrlVars(),
                loading: false
            })
        }else{
            const coin = this.state.coin;
            fetch("/api/currencies/"+coin)
            .then(response => response.json())
            .then(data => this.setState({data: data}))
        }
        setTimeout(this.componentDidMount, 3000)
    }

    updateView = (event) =>{
        this.setState({
            duration: event.target.value,
        })
    }

    render() {
        return(
            <p>
                <h3>{this.state.data.name}</h3>
                <h4>Code: {this.state.coin}</h4>
                <h4>Current Price: {this.state.data.price}</h4>
                <h4>24 Hour Change: {this.state.data.change}</h4>
            </p>
        )
    }
}
const windowElement = document.getElementById('Coin-Data');
ReactDOM.render(e(CurrenciesInfo), windowElement);