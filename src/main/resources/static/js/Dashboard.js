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
        this.interval = setInterval(() => {
            console.log("Getting User Data"), 3000
        });
    }
    componentWillUnmount() {
        clearInterval(this.interval);
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
                                <th></th>
                                <th>Code</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Value</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td>BTC</td>
                                <td>9000</td>
                                <td>3</td>
                                <td>27000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="pane pain-split-two">
                    <h5>Current orders</h5>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Code</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Value</th>
                                <th>Buy/Sell</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td>BTC</td>
                                <td>9010</td>
                                <td>1</td>
                                <td>9010</td>
                                <td>Sell</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>BTC</td>
                                <td>8500</td>
                                <td>2</td>
                                <td>17000</td>
                                <td>Sell</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="pane pain-split-two">
                    <h5>Leader Board</h5>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Code</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Value</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td>BTC</td>
                                <td>9000</td>
                                <td>3</td>
                                <td>27000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="pane pain-split-two">
                    <h5>Friends</h5>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Code</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Value</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td>BTC</td>
                                <td>9000</td>
                                <td>3</td>
                                <td>27000</td>
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