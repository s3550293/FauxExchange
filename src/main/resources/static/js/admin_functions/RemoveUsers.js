const e = React.createElement;
class RemoveUsers extends React.Component {
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
        setTimeout(this.componentDidMount, 3000);
    }

    remove = (event,code) => {
        event.preventDefault();
        alert("remove "+code);
    }

    render() {
        //Sets render to loading if coin array doesn't have data.
        if(this.state.loading){
            return <tbody><tr><td>loading...</td></tr></tbody>;
        }
        return(
            <tbody>
                    <tr>
                        <th className="text-center">Rank</th>
                        <th className="text-center">User</th>
                        <th className="text-center">Value</th>
                        <th></th>
                    </tr>
                    {this.state.users.map(user => (
                        <tr key={user.id}>
                            <td className="text-center">{user.rank}</td>
                            <td className="text-center">{user.name}</td>
                            <td className="text-center">{Math.round(user.value * 10000) / 10000}</td>
                            <td className="text-center"><button onClick={e =>{this.remove(e,user.id)}} className="button error"> Remove</button></td>
                        </tr>
                    ))}
                </tbody>
        );
    }
}
const windowElement = document.getElementById('remove_users');
ReactDOM.render(e(RemoveUsers), windowElement);