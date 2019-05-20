const e = React.createElement;
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            accountValues: '',
            crypto: '',
            orders: '',
        };
    }
    
    //Fetchs from rest API
    componentDidMount() {
        console.log("Getting User Data");
        setTimeout(this.componentDidMount, 15000);
    }

    render() {
        return(
            <div className="content-split-two">
                <div className="pane pain-split-two profile">
                    <h4 className="box-icon" Style="font-size:104px;"><i className="fas fa-user"></i></h4>
                    <span>Name</span>
                    <span>Rank</span>
                    <span>Cash</span>
                </div>
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
                            <tr>
                                <td className="text-center"></td>
                                <td className="text-center">BTC</td>
                                <td className="text-center">9000</td>
                                <td className="text-center">3</td>
                                <td className="text-center">27000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
                            <tr>
                                <td className="text-center"></td>
                                <td className="text-center">BTC</td>
                                <td className="text-center">9010</td>
                                <td className="text-center">1</td>
                                <td className="text-center">9010</td>
                                <td className="text-center">Sell</td>
                            </tr>
                            <tr>
                                <td className="text-center"></td>
                                <td className="text-center">BTC</td>
                                <td className="text-center">8500</td>
                                <td className="text-center">2</td>
                                <td className="text-center">17000</td>
                                <td className="text-center">Sell</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
                <div className="pane pain-split-two">
                    <h5>Friends</h5>
                    <form>
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
            </div>
        );
    }
}
const windowElement = document.getElementById('Dash-Content');
ReactDOM.render(e(Dashboard), windowElement);