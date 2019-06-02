const e = React.createElement;
class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
        };
    }
    
    //Fetchs from rest API
    componentDidMount = () => {
        //fetch friends
        fetch("/api/session/friends")
        .then(response => response.json())
        .then(data => this.setState({friends: data}))

        //refresh
        setTimeout(this.componentDidMount, 3000);
    }

    // Function called when person is added to freinds list
    friendHandleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(stringifyFormData(data));
        fetch('/api/session/addfriends', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: stringifyFormData(data),
        });
        console.log(stringifyFormData(data));
    }

    render() {
        return(
            <div Style="margin:0; width: 100%;" className="pane mobile">
                <form className="friends-search" onSubmit = {this.friendHandleSubmit}>
                    <input className="seach-input" type="text" id="email" name="email"/>
                    <input type="Submit" className="button" value="Add"/>
                </form>
                <table>
                    <tbody>
                        <tr>
                            <th className="text-center">Username</th>
                            <th className="text-center">Value</th>
                        </tr>
                        {this.state.friends.map(friend => (
                            <tr>
                                <td className="text-center">{friend.name}</td>
                                <td className="text-center dispNUM">${Math.round(friend.value * 10000) / 10000}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
const windowElement = document.getElementById('Content');
ReactDOM.render(e(Friends), windowElement);
