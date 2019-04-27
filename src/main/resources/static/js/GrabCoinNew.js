const e = React.createElement;
class GrabCoinNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            coins: [],
        };
    }
    
    //Fetchs from rest API
    componentDidMount() {
        this.interval = setInterval(() => {
            // var i;
            // const url = "/api/currencies";
            // const response = await fetch(url);
            // const data = await response.json();
            // this.setState({coins: data, loading: false})
            fetch("/api/currencies")
            .then(response => response.json())
            .then(data => this.setState({coins: data, loading: false})), 3000
        });
        //Code for testing api fetch
        // console.log(data);
        //Code to see if coins array has been correctly filled out
        // for(i = 0; i <this.state.coins.length;i++) {
        //     console.log(this.state.coins[i]);
        // }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
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
                    //Key used as a unique identifier otherwise console will spit out warning
                    // onClick={window.location='currency'}
                    <tr key={coin.code} >
                        <td className="text-center"><img src={"logos/"+coin.code+".svg"} height="30px" width="30p"></img></td>
                        <td className="text-center">{coin.name}</td>
                        <td className="text-center">{coin.price}</td>
                        <td className="text-center">{coin.change}</td>
                        {/* <td className="text-center"><button className="button primary">Buy/Sell</button></td> */}
                    </tr>
                ))}
            </tbody>
        );
    }
}
const windowElement = document.getElementById('API_Table');
ReactDOM.render(e(GrabCoinNew), windowElement);