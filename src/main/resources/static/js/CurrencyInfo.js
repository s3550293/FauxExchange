const e = React.createElement;
class CurrencyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            coin: '',
        };
    }
    getUrlVars = () =>{
        const url_string = window.location.href;
        const url = new URL(url_string);
        return url.searchParams.get("code");
    }

    componentDidMount = () => {
        if(this.state.loading){
            this.setState({
                coin: this.getUrlVars(),
                loading: false
                
            })
            setTimeout(this.componentDidMount, 500);
        }else{
            const coin = this.state.coin;
            fetch("/api/currencies/"+coin)
            .then(response => response.json())
            .then(data => this.setState({data: data}))
            setTimeout(this.componentDidMount, 3000)
        }
    }

    updateView = (event) =>{
        this.setState({
            duration: event.target.value,
        })
    }

    render() {
        return(
            <div>
                <div className="title-pane">
                    <h2 className="page-title">{this.state.data.name}</h2>
                </div>
                <div className="pane">
                    <p>
                        <h4>Code: {this.state.coin}</h4>
                        <h4>Current Price: {this.state.data.price}</h4>
                        <h4>24 Hour Change: {this.state.data.change}</h4>
                    </p>
                </div>
            </div>
        )
    }
}
const windowElement = document.getElementById('Coin-Data');
ReactDOM.render(e(CurrencyInfo), windowElement);