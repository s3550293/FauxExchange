const e = React.createElement;
var i = 0;
class BuyCoin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buyQtyVal:'',
            buyPriceVal:'',
            sellQtyVal:'',
            sellPriceVal:''
        }
    }

    buyHandleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        data.append('type', 'buy');
        data.append('code', 'BTC');

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
        data.append('code', 'BTC');
        
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
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    multiply(val){
        console.log(val);
        if(val == "buy"){
            console.log("This is for buy bitch");
            return this.state.buyPriceVal * this.state.buyQtyVal;
        }else{
            console.log("This is for selling the value yeah idk");
            return this.state.sellPriceVal * this.state.sellQtyVal;
        }
    }

    bestPrice(){
        console.log("Best Price button pressed");
        this.state.buyPriceVal = 1234;
    }


    render() {
        const {buyQtyVal} = this.state.buyQtyVal;
        const {buyPriceVal} = this.state.buyPriceVal;

        const {sellQtyVal} = this.state.sellQtyVal;
        const {sellPriceVal} = this.state.sellPriceVal;
        return(
            <div className="flex-container">
                <div Style="margin: 5em;">
                    <h3>Buy</h3>
                    <br />
                    <form onSubmit = {this.buyHandleSubmit}>
                        <input type="text" id="qty" name= "buyQtyVal" placeholder="Qty" pattern="\d+" value={buyQtyVal} onChange={this.updateInput}/>
                        <input type="text" id="price" name="buyPriceVal" placeholder="Value" pattern="\d+" value={buyPriceVal} onChange={this.updateInput}/>
                        {/* <button type="button" className="button" onClick={this.bestPrice()}>Best Buy</button> */}
                        <h4>{this.multiply("buy")}</h4>
                        <input type="submit" className="button success" value="Buy" />
                    </form>
                </div>
                <div Style="margin: 5em;">
                    <h3>Sell</h3>
                    <br />
                    <form onSubmit = {this.sellHandleSubmit}>
                        <input type="text" id="qty" name= "sellQtyVal" placeholder="Qty" value={sellQtyVal} onChange={this.updateInput}/>
                        <input type="text" id="price" name="sellriceVal" placeholder="value" value={sellPriceVal} onChange={this.updateInput}/>
                        <h4>{this.multiply("sell")}</h4>
                        <input type="submit" className="button error" value="Sell" />
                    </form>
                </div>
            </div>
        );
    }
}
const windowElement = document.getElementById('OrderForm');
ReactDOM.render(e(BuyCoin),windowElement);

function stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
}