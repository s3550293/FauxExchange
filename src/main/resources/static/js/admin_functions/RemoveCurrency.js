const e = React.createElement;
class RemoveCurrency extends React.Component {
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
        .then(data => this.setState({coins: data, loading: false}))
        setTimeout(this.componentDidMount, 3000)
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    remove = (event,code) => {
        event.preventDefault();
        alert("remove "+code);
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
                    <th>Name</th>
                    <th>Value</th>
                    <th>Change</th>
                    <th></th>
                </tr>
                {this.state.coins.map(coin => (
                    <tr key={coin.code} name={coin.code}>
                        <td className="text-center"><img src={"logos/"+coin.code+".svg"} height="30px" width="30p"></img></td>
                        <td className="text-center">{coin.name}</td>
                        <td className="text-center">{Math.round(coin.price * 10000) / 10000}</td>
                        <td className="text-center">{Math.round(coin.change * 10000) / 10000}</td>
                        <td className="text-center"><button onClick={e =>{this.remove(e,coin.code)}} className="button error"> Remove</button></td>
                    </tr>
                ))}
            </tbody>
        );
    }
}
const windowElement = document.getElementById('remove_currency');
ReactDOM.render(e(RemoveCurrency), windowElement);