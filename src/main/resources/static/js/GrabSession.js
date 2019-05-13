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
    componentDidMount() {
        this.interval = setInterval(() => {
            fetch("/api/session")
            .then(response => response.json())
            .then(data => this.setState({session: data, loading: false})), 3000
        });
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if(this.state.loading){
            return <tbody><tr><td>loading...</td></tr></tbody>;
        }
        return(
            <div>
                <label>Welcome Session:</label>
                <p>{this.state.session}</p>
            </div>
        );
    }
}
const windowElement = document.getElementById('SessionJS');
ReactDOM.render(e(GrabSession), windowElement);