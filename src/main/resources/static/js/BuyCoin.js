const e = React.createElement;
var i = 0;
class BuyCoin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        data.append('type', 'buy');
        data.append('code', 'BTC');
        this.setState({
            res: stringifyFormData(data),
        });
        console.log(this.state.res);

        fetch('/api/orders', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: stringifyFormData(data),
        });
    }

    render() {
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <input type="text" id="price" name="price" placeholder="Value" pattern="\d+" />
                    <input type="text" id="qty" name= "qty" placeholder="Qty" pattern="\d+" />
                    <input type="submit" className="button success" value="Buy" />
                </form>
                {this.state.res && (
                    <div>
                        <h3>Data to be sent:</h3>
                        <pre>FormData {this.state.res}</pre>
                    </div>
                )}
            </div>
        );
    }
}
const windowElement = document.getElementById('Testing');
ReactDOM.render(e(BuyCoin),windowElement);

function stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
}