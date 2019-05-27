const e = React.createElement;
class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            orders: [],
        };
    }
    
    //Fetchs from rest API
    componentDidMount = () => {
        fetch("/api/session/transactions")
        .then(response => response.json())
        .then(data => this.setState({orders: data, loading: false}))
        setTimeout(this.componentDidMount, 3000);
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
            <table class="hover">
                <tbody>
                    <tr>
                        <th class="text-center">In/Out</th>
                        <th class="text-center">Value</th>
                        <th class="text-center">Type</th>
                        <th class="text-center">Currency</th>
                        <th class="text-center">Volume</th>
                        <th class="text-center">Profit/Loss</th>
                        <th class="text-center">Date</th>
                    </tr>
                    {this.state.orders.map(order => (
                        //<td className="text-center"><i class="fas fa-arrow-right transation-money-out-arrow"></i></td>
                        //<td class="text-center"><i class="fas fa-arrow-left transation-money-in-arrow"></i></td>
                        <tr key={order.transactionId}>
                            <td className="text-center"></td>
                            <td className="text-center">${Math.round(order.value * 10000) / 10000}</td>
                            <td className="text-center">{order.type}</td>
                            <td className="text-center">{order.code}</td>
                            <td className="text-center">{order.qty}</td>
                            <td className="text-center">${order.pnl}</td>
                            <td className="text-center"></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        );
    }
}
const windowElement = document.getElementById('Transaction');
ReactDOM.render(e(Transaction), windowElement);