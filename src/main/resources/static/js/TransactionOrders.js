const e = React.createElement;
class TransactionOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            orders: [],
        };
    }
    
    //Fetchs from rest API
    componentDidMount() {
        this.interval = setInterval(() => {
            fetch("/api/orders")
            .then(response => response.json())
            .then(data => this.setState({orders: data, loading: false})), 3000
        });

        // var i;
        // const url = "/api/orders";
        // const response = await fetch(url);
        // const data = await response.json();
        // this.setState({orders: data, loading: false})

        //Code for testing api fetch
        // console.log(data);
        //Code to see if coins array has been correctly filled out
        // for(i = 0; i <this.state.orders.length;i++) {
        //     console.log(this.state.orders[i]);
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
                    <th>Type</th>
                    <th>Currency</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
                {this.state.orders.map(order => (
                    //Key used as a unique identifier otherwise console will spit out warning
                    // onClick={window.location='currency'}
                    <tr key={order.id} >
                        <td className="text-center">{order.type}</td>
                        <td className="text-center">{order.code}</td>
                        <td className="text-center">{order.price}</td>
                        <td className="text-center">{order.qty}</td>
                    </tr>
                ))}
            </tbody>
        );
    }
}
const windowElement = document.getElementById('Orders');
ReactDOM.render(e(TransactionOrders), windowElement);