const e = React.createElement;
class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: [],
        };
    }
    
    //Fetchs from rest API
    componentDidMount = () => {
        fetch("/api/user/leaderboard")
        .then(response => response.json())
        .then(data => this.setState({users: data, loading: false}))
        console.log(this.state.users);
        setTimeout(this.componentDidMount, 3000);
    }

    render() {
        //Sets render to loading if coin array doesn't have data.
        if(this.state.loading){
            return <tbody><tr><td>loading...</td></tr></tbody>;
        }
        return(
            <table class="hover">
                <tbody>
                    <tr>
                        <th class="text-center">Rank</th>
                        <th class="text-center">User</th>
                        <th class="text-center">Value</th>
                    </tr>
                    {this.state.users.map(user => (
                        <tr>
                            <td className="text-center">{user.rank}</td>
                            <td className="text-center">{user.name}</td>
                            <td className="text-center">{Math.round(user.value * 10000) / 10000}</td>
                            <td className="text-center"><button onClick={e =>{this.remove(e,user.name)}} className="button error"> Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        );
    }
}
const windowElement = document.getElementById('LeaderboardTable');
ReactDOM.render(e(Leaderboard), windowElement);