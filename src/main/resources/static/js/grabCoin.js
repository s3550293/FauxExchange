const e = React.createElement;
const coinCode =['btc-aud','dash-aud','doge-aud','eos-aud','eth-aud','ltc-aud','mkr-aud','salt-aud','xrp-aud','zec-aud'];
class grabBTC extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            coins: []
        };
    }
    
    async componentDidMount(){
        var i;
        for(i = 0; i <coinCode.length;i++){
            const url = "https://api.cryptonator.com/api/ticker/"+coinCode[i];
            const response = await fetch(url);
            const data = await response.json();
            this.setState({loading: false});
            this.state.coins.push(data.ticker)
            //console.log(data.ticker);
            console.log(this.state.coins[i]);
        }
        
    }

    render(){
        //var i;
        if(this.state.loading){
            return <div>loading...</div>;
        }

        return(
            <div>
                {this.state.coins.map(coin => (
                    <div key={coin.base}>
                        <div>Currency: {coin.base}</div>
                        <div>Price: {coin.price} {coin.target}</div>
                        <div>Change: {coin.change}</div>
                        <div><p></p></div>
                    </div>
                ))}
            </div>
        );
    }
}
const windowElement = document.getElementById('grabBTC');
ReactDOM.render(e(grabBTC), windowElement);