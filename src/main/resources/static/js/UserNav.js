const e = React.createElement;
class UserNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rand: 1,
            user: ''
        };
    }
    
    //Fetchs from rest API
    componentDidMount() {
        // fetch("/api/orders")
        // .then(response => response.json())
        // .then(data => this.setState({orders: data, loading: false}));

        console.log("Getting User Data");
        fetch('/api/session/info')
        .then(response => response.json())
        .then(data => this.setState({user: data}))

        const num = Math.floor(Math.random() *4)+1
        this.setState({
            rand: num
        });
    }

    render() {
        const num = this.state.rand;
        return(
            <div>
                <div Style="display:flex; justify-content: center;">
                    <img className='avatar' src={'images/placeholder/person_'+num+'.jpg'}/> 
                </div>
                <h5 Style="color: #fff; text-align: center;">{this.state.user.fName}</h5>
                <p Style="color: #fff; text-align: center;">${this.state.user.cash}</p>
            </div>
        );
    }
}
const windowElement = document.getElementById('Nav-Gation');
ReactDOM.render(e(UserNav), windowElement);