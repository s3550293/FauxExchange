const e = React.createElement;
class Dashbaord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    //Fetchs from rest API
    componentDidMount() {
        this.interval = setInterval(() => {
            null, 3000
        });
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return(
            null
        );
    }
}
const windowElement = document.getElementById('API_Table');
ReactDOM.render(e(GrabCoDashbaordinNew), windowElement);