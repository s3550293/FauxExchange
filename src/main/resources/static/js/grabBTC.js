const e = React.createElement;
class grabBTC extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            coin: null,
        };
    }
    
    async componentDidMount(){
        const url = "https://api.cryptonator.com/api/ticker/btc-aud";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({coin:data,loading: false});
        console.log(data);
    }

	render(){
        const coinData = this.state.coin;
        return(
            <div>
                {this.state.loading || !this.state.coin ? (
                        <div>loading...</div> 
                    ) : ( 
                        <div>
                            <div>Currency: {coinData.ticker.base}</div>
                            <div>Price: {coinData.ticker.price} {coinData.ticker.target}</div>
                            <div>Change: {coinData.ticker.change}</div>
                        </div>
                    )
                }
            </div>
        );
    }
}
const windowElement = document.getElementById('grabBTC');
ReactDOM.render(e(grabBTC), windowElement);