//const e = React.createElement;
//const coinCode =['btc-aud','dash-aud','doge-aud','eos-aud','eth-aud','ltc-aud','mkr-aud','salt-aud','xrp-aud','zec-aud'];
class GrabCoinNew extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            coins: null
        };
    }
    
    async componentDidMount(){
        // var i;
        // for(i = 0; i <coinCode.length;i++){
        //     const url = "https://api.cryptonator.com/api/ticker/"+coinCode[i];
        //     const response = await fetch(url);
        //     const data = await response.json();
        //     this.state.coins.push(data.ticker);
        //     this.setState({loading: false});
        //     //console.log(data.ticker);
        //     console.log(this.state.coins[i]);
        // }
        const url = "/api/currencies";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    }

    render(){
        //var i;
        if(this.state.loading){
            return <tbody><tr><td>loading...</td></tr></tbody>;
        }
        return(null
            // <tbody>
            //     <tr>
            //         <th></th>
            //         <th>Name</th>
            //         <th>Value</th>
            //         <th>Change</th>
            //         <th></th>
            //     </tr>
            //     {this.state.coins.map(coin => (
            //         <tr key={coin.base}>
            //             <td className="text-center"><img src={"logos/"+coin.base+".svg"} height="30px" width="30p"></img></td>
            //             <td className="text-center">{coin.base}</td>
            //             <td className="text-center">{coin.price} {coin.target}</td>
            //             <td className="text-center">{coin.change}</td>
            //             <td className="text-center"><button className="button primary">Buy/Sell</button></td>
            //         </tr>
            //     ))}
            // </tbody>
        );
    }
}
const windowElement = document.getElementById('API_Table');
ReactDOM.render(e(grabBTC), windowElement);