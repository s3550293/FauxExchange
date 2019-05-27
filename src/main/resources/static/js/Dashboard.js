const e = React.createElement;
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            accountValues: '',
            holdings: [],
            orders: [],
            session:'',
            rand: 1,
            friends: [],
        };
    }
    
    //Fetchs from rest API
    componentDidMount() {
        const num = Math.floor(Math.random() *4)+1
        //fetch session
        fetch("/api/session")
        .then(response => response.json())
        .then(data => this.setState({session: data}))

        console.log("Getting User Data");
        fetch('/api/session/info')
        .then(response => response.json())
        .then(data => this.setState({user: data}))

        //fetch accountValues
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

        //fetch friends
        fetch("/api/session/friends")
        .then(response => response.json())
        .then(data => this.setState({friends: data}))

        //refresh
        setTimeout(this.componentDidMount, 15000);
    }

    currencyClick = (event,code) => {
        event.preventDefault();
        console.log("Clicked");
        console.log(code);
        window.location.href = "/currency?code="+code;
    }

    userprofile(){
        const num = this.state.rand;
        return(
            <div className="pane pain-split-two profile">
                <div Style="display:flex; justify-content: center;">
                    <img className='avatar' src={'images/placeholder/person_'+num+'.jpg'}/> 
                </div>
                <span>Name: {this.state.user.fName + " " + this.state.user.lName}</span>
                <span>Rank</span>
                <span>Cash: <span className="dispNUM">${Math.round(this.state.user.cash * 10000) / 10000}</span></span>
            </div>
        );
    }

    accountvalue(){
        return(
            <div className="pane pain-split-two account-value">
                <h5>Account Value</h5>
                <ul className="stats-list">
                    <li>
                        $0 <span className="stats-list-label">Account Value</span>
                    </li>
                    <li className="stats-list-positive">
                        $0 <span className="stats-list-label">Gains</span>
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
                            <th className="text-center">Qty</th>
                            <th className="text-center">Value</th>
                        </tr>
                        {this.state.holdings.map(holding => (
                            <tr>
                                <td>
                                    <tr Style="padding:.3em; background:none;">
                                        <td Style="padding:.3em; text-align: left; font-weight:700;" className="text-center">{holding.code}</td>
                                    </tr>
                                    <tr Style="padding:.3em; background:none;">
                                        <td Style="padding:.3em; text-align: left;" className="text-center dispNUM">{Math.round(holding.price * 10000) / 10000}</td>
                                    </tr>
                                </td>
                                <td className="text-center dispNUM">{Math.round(holding.qty * 10000) / 10000}</td>
                                <td className="text-center dispNUM">{Math.round(holding.value * 10000) / 10000}</td>
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
                            <th className="text-center">Qty</th>
                            <th className="text-center">Value</th>
                            <th className="text-center">Buy/Sell</th>
                        </tr>
                        {this.state.orders.map(order => (
                            <tr key={order.orderId} onClick={(e) =>{this.currencyClick(e,coin.code)}}>
                                <td>
                                    <tr Style="padding:.3em; background:none;">
                                        <td Style="padding:.3em; text-align: left; font-weight:700;" className="text-center">{order.code}</td>
                                    </tr>
                                    <tr Style="padding:.3em; background:none;">
                                        <td Style="padding:.3em; text-align: left;" className="text-center">{Math.round(order.price * 10000) / 10000}</td>
                                    </tr>
                                </td>
                                <td className="text-center">{order.qty}</td>
                                <td className="text-center">{Math.round((order.price * order.qty) * 10000) / 10000}</td>
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
    friendHandleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(stringifyFormData(data));
        fetch('/api/session/friends', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: stringifyFormData(data),
        });
    }

    friends(){
        return(
            <div className="pane pain-split-two">
                <h5>Friends</h5>
                <form className="friends-search" onSubmit = {this.friendHandleSubmit}>
                    <input className="seach-input" type="text" id="email"/>
                    <input type="Submit" className="button" value="Add"/>
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