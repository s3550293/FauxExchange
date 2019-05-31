const e = React.createElement;
var i = 0;
class OrderCoin extends React.Component {
    constructor(props) {
        super(props);
        this.bbp = React.createRef();
        this.state = {
            loading: true,
            buyQtyVal:'',
            buyPriceVal:'',
            sellQtyVal:'',
            sellPriceVal:'',
            code:'',
            session:'',
            coin: []
        }
    }

    componentDidMount = () => {
        console.log(this.state.loading);
        if(this.state.loading){
            const url_string = window.location.href;
            const url = new URL(url_string);
            const crptoCode = url.searchParams.get("code");
            this.setState({code: crptoCode});
            console.log(crptoCode);

            fetch("/api/session")
            .then(response => response.json())
            .then(data => this.setState({session: data, loading: false}))
            this.setState({loading: false});
            setTimeout(this.componentDidMount, 1000);
        }else{
            fetch("/api/currencies/"+this.state.code)
            .then(response => response.json())
            .then(data => this.setState({coin: data}))
            setTimeout(this.componentDidMount, 5000);
        }
    }

    buyHandleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        data.append('type', 'buy');
        data.append('code', this.state.code);
        data.append('userId',this.state.session.userId);
        console.log(stringifyFormData(data));
        fetch('/api/orders', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: stringifyFormData(data),
        }).then(document.getElementById("Buy-Confirm").classList.remove("hideLoginError"));
        // window.location.href = "/orders";
    }

    sellHandleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        data.append('type', 'sell');
        data.append('code', this.state.code);
        data.append('userId',this.state.session.userId);
        console.log(stringifyFormData(data));
        fetch('/api/orders', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: stringifyFormData(data),
        }).then(document.getElementById("Sell-Confirm").classList.remove("hideLoginError"));
        // window.location.href = "/orders";
    }

    updateInput = (event) => {
        event.preventDefault();
        // event.target.value = 1000;
        this.setState({
            [event.target.id]: event.target.value,
            [event.target.value]: event.target.id
        })
    }

    multiply(bool){
        if(bool){
            return Math.round((this.state.buyPriceVal * this.state.buyQtyVal) * 10000) / 10000;
        }
        else{
            return Math.round((this.state.sellPriceVal * this.state.sellQtyVal) * 10000) / 10000;
        }
    }

    bestPrice = (event) =>{
        if(event.target.name == "bestBuy"){
            this.setState({
                buyPriceVal: this.state.coin.recentPrice
            });
        }else{
            this.setState({
                sellPriceVal: this.state.coin.recentPrice
            });
        }
    }

    sellAll = (event) =>{
        event.preventDefault();
        alert("I dont do anything yet");
    }


    render() {
        const {buyQtyVal} = this.state.buyQtyVal;

        const {sellQtyVal} = this.state.sellQtyVal;
        return(
            <div className="content-split-two">
                <div className="pane pain-split-two buysell">
                    <h3>Buy {this.state.code}</h3>
                    <br />
                    <form onSubmit = {this.buyHandleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td colspan="2">
                                        <input type="text" id="buyQtyVal" 
                                            name="qty" placeholder="Qty" required="required" pattern="^\s*(?=.*[1-9])\d*(?:\.\d{1,999999999})?\s*$" title="Please enter a positive number"
                                            value={buyQtyVal} onChange={this.updateInput}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td Style="padding-right:0em;">
                                        <input className="buysell-value" type="text" id="buyPriceVal" 
                                            name="price" placeholder="Value" required="required" pattern="^\s*(?=.*[1-9])\d*(?:\.\d{1,999999999})?\s*$" title="Please enter a positive number"
                                            value={this.state.buyPriceVal} onChange={this.updateInput}/>
                                    </td>
                                    <td>
                                    <button Style="margin-top:0em; width:100%;" type="button" name="bestBuy" className="button" value="bestBuy" onClick={this.bestPrice}>Best Buy</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h4>Cost: </h4>
                                    </td>
                                    <td>
                                        <h4 Style="font-size: 1.4em;" className="dispNUM">${this.multiply(true)}</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td Style="text-align: center;" colspan="2">
                                        <button Style="margin:auto; width:50%;" type="submit" name="submitBuy" className="button success" value="Buy">Buy</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <div id="Buy-Confirm" class="showBuySuc hideLoginError">
                        <h6>Buy Order Placed</h6>
                    </div>
                </div>
                <div className="pane pain-split-two buysell">
                    <h3>Sell {this.state.code}</h3>
                    <br />
                    <form onSubmit = {this.sellHandleSubmit}>

                    <table>
                        <tbody>
                            <tr>
                                <td Style="padding-right:0em;">
                                    <input type="text" id="sellQtyVal" Style="width:100%"
                                        name="qty" placeholder="Qty"  required="required" pattern="^\s*(?=.*[1-9])\d*(?:\.\d{1,999999999})?\s*$" title="Please enter a positive number"
                                        value={sellQtyVal} onChange={this.updateInput}/>
                                </td>
                                <td>
                                    <button Style="margin-top:0em; width:100%;" type="button" name="sellAll" className="button warning" onClick={this.sellAll}>Sell All</button>
                                </td>
                            </tr>
                            <tr>
                                <td Style="padding-right:0em;">
                                    <input className="buysell-value" type="text" id="sellPriceVal" 
                                        name="price" placeholder="value" required="required" pattern="^\s*(?=.*[1-9])\d*(?:\.\d{1,999999999})?\s*$" title="Please enter a positive number"
                                        value={this.state.sellPriceVal} onChange={this.updateInput}/>
                                </td>
                                <td>
                                    <button Style="margin-top:0em; width:100%;" type="button" name="bestSell" className="button" onClick={this.bestPrice}>Best Sell</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4>Cost:</h4>
                                </td>
                                <td>
                                    <h4 Style="font-size: 1.4em;" className="dispNUM">${this.multiply(false)}</h4>
                                </td>
                            </tr>
                            <tr>
                                <td Style="text-align: center;" colspan="2">
                                    <button Style="margin:auto; width:50%;" type="submit" className="button error">Sell</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </form>
                    <div id="Sell-Confirm" class="showBuySuc hideLoginError">
                        <h6>Sell Order Placed</h6>
                    </div>
                </div>
            </div>
        );
    }
}
const windowElement = document.getElementById('OrderForm');
ReactDOM.render(e(OrderCoin),windowElement);

function stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
}