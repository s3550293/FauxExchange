const e = React.createElement;
var i = 0;
class OrderCoin extends React.Component {
    constructor(props) {
        super(props);
        this.bbp = React.createRef();
        this.state = {
            buyQtyVal:'',
            buyPriceVal:'',
            sellQtyVal:'',
            sellPriceVal:'',
            code:'',
            session:''
        }
    }

    componentDidMount (){
        const url_string = window.location.href;
        const url = new URL(url_string);
        const crptoCode = url.searchParams.get("code");
        this.setState({code: crptoCode});
        console.log(crptoCode);

        fetch("/api/session")
        .then(response => response.json())
        .then(data => this.setState({session: data}))
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
        });
        alert('Buy Order Successful');
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
        });
        alert('Sell Order Successful');
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
            return this.state.buyPriceVal * this.state.buyQtyVal;
        }
        else{
            return this.state.sellPriceVal * this.state.sellQtyVal;
        }
    }

    bestPrice = (event) =>{
        event.preventDefault();
        const data = new FormData(event.target);
        data.append('type', 'buy');
        data.append('code', 'BTC');

        console.log("Getting Best Price");
        console.log(stringifyFormData(data));
        if(event.target.name == "bestBuy"){
            this.setState({
                buyPriceVal: 1234
            });
        }else{
            this.setState({
                sellPriceVal: 4321
            });
        }
    }


    render() {
        const {buyQtyVal} = this.state.buyQtyVal;
        const {buyPriceVal} = this.state.buyPriceVal;

        const {sellQtyVal} = this.state.sellQtyVal;
        const {sellPriceVal} = this.state.sellPriceVal;
        return(
            <div className="content-split-two">
                <div className="pane pain-split-two">
                    <h3>Buy</h3>
                    <br />
                    <form onSubmit = {this.buyHandleSubmit}>
                        <input type="text" id="buyQtyVal" 
                        name="qty" placeholder="Qty" required="required" pattern="^\s*(?=.*[1-9])\d*(?:\.\d{1,999999999})?\s*$" title="Please enter a positive number"
                        value={buyQtyVal} onChange={this.updateInput}/>
                        <input type="text" id="buyPriceVal" 
                            name="price" placeholder="Value" required="required" pattern="^\s*(?=.*[1-9])\d*(?:\.\d{1,999999999})?\s*$" title="Please enter a positive number"
                            value={buyPriceVal} onChange={this.updateInput}/>
                        <button type="button" name="bestBuy" className="button" value="bestBuy" onClick={this.bestPrice}>Best Buy</button>
                        <h4>{this.multiply(true)}</h4>
                        <button type="submit" name="submitBuy" className="button success" value="Buy">Buy</button>
                    </form>
                </div>
                <div className="pane pain-split-two">
                    <h3>Sell</h3>
                    <br />
                    <form onSubmit = {this.sellHandleSubmit}>
                        <input type="text" id="sellQtyVal" 
                        name="qty" placeholder="Qty"  required="required" pattern="^\s*(?=.*[1-9])\d*(?:\.\d{1,999999999})?\s*$" title="Please enter a positive number"
                        value={sellQtyVal} onChange={this.updateInput}/>
                        <input type="text" id="sellPriceVal" 
                        name="price" placeholder="value" required="required" pattern="^\s*(?=.*[1-9])\d*(?:\.\d{1,999999999})?\s*$" title="Please enter a positive number"
                        value={sellPriceVal} onChange={this.updateInput}/>
                        <button type="button" name="bestSell" className="button" onClick={this.bestPrice}>Best Sell</button>
                        <h4>{this.multiply(false)}</h4>
                        <button type="submit" className="button error">Sell</button>
                    </form>
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