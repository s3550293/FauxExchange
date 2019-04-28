const e = React.createElement;
var i = 0;
class BuyCoin extends React.Component {
    constructor(props) {
        super(props);
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

    render() {
        return(
            <div>
                <div>
                    <h3>Buy</h3>
                    <br />
                    <form onSubmit = {this.buyHandleSubmit}>
                        <input type="text" id="price" name="price" placeholder="Value" pattern="\d+" />
                        <input type="text" id="qty" name= "qty" placeholder="Qty" pattern="\d+" />
                        <input type="submit" className="button success" value="Buy" />
                    </form>
                </div>
                <div>
                    <h3>Sell</h3>
                    <br />
                    <form onSubmit = {this.sellHandleSubmit}>
                        <input type="text" id="price" name="price" placeholder="value" />
                        <input type="text" id="qty" name= "qty" placeholder="Qty" />
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