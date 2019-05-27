const e = React.createElement;
class CurrenciesData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            coins: [],
        };
    }
    
    //Fetchs from rest API
    componentDidMount = () => {
        fetch("/api/currencies")
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => this.setState({coins: data, loading: false}))
        setTimeout(this.componentDidMount, 3000)
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    currencyClick = (event,code) => {
        event.preventDefault();
        console.log("Clicked");
        console.log(code);
        window.location.href = "/currency?code="+code;
    }

    changeValue = (value,change) => {
        const percent = (change/value) * 100
        const rounded = Math.round(percent * 10000) / 10000
        if(rounded >= 0){
            return (
                <td Style="padding:.3em; color: #48bf0d; font-weight: 700;" className="text-center dispNUM">{rounded}%</td>
            );
        }
        else{
            return (
                <td Style="padding:.3em; color: #bf0d30; font-weight: 700;" className="text-center dispNUM">{rounded}%</td>
            );
        }
    }

    render() {
        //Sets render to loading if coin array doesn't have data.
        if(this.state.loading){
            return <tbody><tr><td>loading...</td></tr></tbody>;
        }
        return(
            <tbody>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Code</th>
                    <th>Change</th>
                </tr>
                {this.state.coins.map(coin => (
                    <tr key={coin.code} name={coin.code} onClick={(e) =>{this.currencyClick(e,coin.code)}}>
                        <td className="text-center"><img src={"logos/"+coin.code+".svg"} height="30px" width="30p"></img></td>
                        <tr Style="padding:.3em; background:none;">
                            <td Style="padding:.3em; text-align: left;" className="text-center"><span Style="font-weight:700; font-size: 1.2em;">{coin.name}</span></td>
                        </tr>
                        <tr Style="padding:.3em; background:none;">
                            <td Style="text-align: left;" className="text-center dispNUM">${Math.round(coin.price[0].value * 10000) / 10000}</td>
                        </tr>
                        <td className="text-center">{coin.code}</td>
                        {this.changeValue(coin.recentPrice, coin.recentChange)}
                    </tr>
                ))}
            </tbody>
        );
    }
}
const windowElement = document.getElementById('API_Table');
ReactDOM.render(e(CurrenciesData), windowElement);