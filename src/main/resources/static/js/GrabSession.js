const e = React.createElement;
class GrabSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            session: ''
        };
    }
    
    //Fetchs from rest API
    async componentDidMount() {
        const url = "/api/session";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({session: data, loading: false});
        //console.log(data.ticker);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if(this.state.loading){
            return <p>loading...</p>;
        }
        return(
            <div>
                <label>Welcome Session: {this.state.session.sessionid}</label>
            </div>
        );
    }
}
const windowElement = document.getElementById('SessionJS');
ReactDOM.render(e(GrabSession), windowElement);