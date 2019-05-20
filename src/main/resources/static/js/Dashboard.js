const e = React.createElement;
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            accountValues: '',
            holdings: [],
            orders: [],
            session:''
        };
    }
    
    //Fetchs from rest API
    componentDidMount() {
        //fetch session
        fetch("/api/session")
        .then(response => response.json())
        .then(data => this.setState({session: data}))

        console.log("Getting User Data");
        fetch('/api/session/info')
        .then(response => response.json())
        .then(data => this.setState({user: data}))

        //fetch for userprofile
        // fetch("/api/userProfile")
        // .then(response => response.json())
        // .then(data => this.setState({user: data}))

        // //fetch accountValues
        // fetch("/api/accountValue")
        // .then(response => response.json())
        // .then(data => this.setState({accountValues: data}))

        //fetch holdings
        fetch("/api/session/crypto")
        .then(response => response.json())
        .then(data => this.setState({holdings: data}))

        //fetch orders
        fetch("/api/session/orders")
        .then(response => response.json())
        .then(data => this.setState({orders: data}))

        //Refresh
        // console.log("Getting User Data");
        // setTimeout(this.componentDidMount, 15000);
    }

    userprofile(){
        return(
            <div className="pane pain-split-two profile">
                <h4 className="box-icon" Style="font-size:104px;"><i className="fas fa-user"></i></h4>
                <span>Name: {this.state.user.fName + " " + this.state.user.lName}</span>
                <span>Rank</span>
                <span>Cash: ${this.state.user.cash}</span>
            </div>
        );
    }

    accountvalue(){
        return(
            <div className="pane pain-split-two account-value">
                <h5>Account Value</h5>
                <ul className="stats-list">
                    <li>
                        $2030 <span className="stats-list-label">Account Value</span>
                    </li>
                    <li className="stats-list-positive">
                        $30 <span className="stats-list-label">Gains</span>
                    </li>
                    <li className="stats-list-negative">
                        $0 <span className="stats-list-label">Loss</span>
                    </li>
                </ul>
            </div>
        );
    }

    holdings(){
        return(
            <div className="pane pain-split-two">
                <h5>Invested Crypto</h5>
                <table>
                    <tbody>
                        <tr>
                            <th className="text-center"></th>
                            <th className="text-center">Code</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Qty</th>
                            <th className="text-center">Value</th>
                        </tr>
                        {this.state.holdings.map(holding => (
                            <tr>
                                <td className="text-center"></td>
                                <td className="text-center">{holding.code}</td>
                                <td className="text-center">{holding.price}</td>
                                <td className="text-center">{holding.qty}</td>
                                <td className="text-center">{holding.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    orders(){
        return(
            <div className="pane pain-split-two">
                <h5>Current orders</h5>
                <table>
                    <tbody>
                        <tr>
                            <th className="text-center"></th>
                            <th className="text-center">Code</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Qty</th>
                            <th className="text-center">Value</th>
                            <th className="text-center">Buy/Sell</th>
                        </tr>
                        {this.state.orders.map(order => (
                            <tr key={order.orderId}>
                                <td className="text-center"></td>
                                <td className="text-center">{order.code}</td>
                                <td className="text-center">{order.price}</td>
                                <td className="text-center">{order.qty}</td>
                                <td className="text-center">{order.price * order.qty}</td>
                                <td className="text-center">{order.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    leader(){
        return(
            <div className="pane pain-split-two">
                <h5>Leader Board</h5>
                <table>
                    <tbody>
                        <tr>
                            <th className="text-center">User</th>
                            <th className="text-center">Value</th>
                        </tr>
                        <tr>
                            <td className="text-center">Han Solo</td>
                            <td className="text-center">$4000.00</td>
                        </tr>
                        <tr>
                            <td className="text-center">Tony Stark</td>
                            <td className="text-center">$3000.00</td>
                        </tr>
                        <tr>
                            <td className="text-center">Natasha</td>
                            <td className="text-center">$3.50</td>
                        </tr>
                    </tbody>
                </table>
            </div>            
        );
    }

    friends(){
        return(
            <div className="pane pain-split-two">
                <h5>Friends</h5>
                <form className="friends-search">
                    <input className="seach-input" type="text"/>
                    <input type="Submit" className="button" value="Search"/>
                </form>
                <table>
                    <tbody>
                        <tr>
                            <th className="text-center">Username</th>
                            <th className="text-center">Value</th>
                        </tr>
                        <tr>
                            <td className="text-center">Tony Stark</td>
                            <td className="text-center">$3000.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return(
            <div className="content-split-two">
                {this.userprofile()}
                {this.accountvalue()}
                {this.holdings()}
                {this.orders()}
                {this.leader()}
                {this.friends()}
            </div>
        );
    }
}
const windowElement = document.getElementById('Dash-Content');
ReactDOM.render(e(Dashboard), windowElement);

function stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
}