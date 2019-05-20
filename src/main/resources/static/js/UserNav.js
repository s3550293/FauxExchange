const e = React.createElement;
class UserNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rand: 1,
        };
    }
    
    //Fetchs from rest API
    componentDidMount() {
        // fetch("/api/orders")
        // .then(response => response.json())
        // .then(data => this.setState({orders: data, loading: false}));
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
                <h5 Style="color: #fff; text-align: center;">UserName</h5>
                <p Style="color: #fff; text-align: center;">$Cash</p>
            </div>
        );
    }
}
const windowElement = document.getElementById('Nav-Gation');
ReactDOM.render(e(UserNav), windowElement);