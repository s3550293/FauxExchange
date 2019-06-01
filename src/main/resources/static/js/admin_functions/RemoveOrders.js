const e = React.createElement;
class RemoveOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            orders: [],
        };
    }
    
    //Fetchs from rest API
    componentDidMount = () => {
        fetch("/api/orders")
        .then(response => response.json())
        .then(data => this.setState({orders: data, loading: false}))
        setTimeout(this.componentDidMount, 3000);
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
                    <th className="text-center">UserId</th>
                    <th className="text-center">Type</th>
                    <th className="text-center">Currency</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Quantity</th>
                    <th></th>
                </tr>
                {this.state.orders.map(order => (
                    //Key used as a unique identifier otherwise console will spit out warning
                    // onClick={window.location='currency'}
                    <tr key={order.id} >
                        <td className="text-center">{order.userId}</td>
                        <td className="text-center">{order.type}</td>
                        <td className="text-center">{order.code}</td>
                        <td className="text-center">{order.price}</td>
                        <td className="text-center">{order.qty}</td>
                        <td className="text-center"><button onClick={e =>{this.remove(e,order.id)}} className="button error"> Remove</button></td>
                    </tr>
                ))}
            </tbody>
        );
    }
}
const windowElement = document.getElementById('remove_orders');
ReactDOM.render(e(RemoveOrders), windowElement);