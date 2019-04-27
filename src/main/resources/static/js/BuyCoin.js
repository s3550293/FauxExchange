const e = React.createElement;
var i = 0;
class BuyCoin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            qty: null,
            order: []
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        i +=1;
        console.log(i+" BIG BOOTY BITCHES");
    }

    render() {
        return(
                <form onSubmit = {this.handleSubmit}>
                    <input type="text" id="value" placeholder="value" />
                    <input type="text" id="Qty" placeholder="Qty" />
                    <input type="submit" className="button success" value="Buy" />
                </form>
        );
    }
}
const windowElement = document.getElementById('Testing');
ReactDOM.render(e(BuyCoin),windowElement);