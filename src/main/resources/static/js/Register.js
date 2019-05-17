const e = React.createElement;
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password:'',
            passwordConfirm:''
        }
    }

    registerHandleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value
        })
        if(this.state.password != this.state.passwordConfirm) {
            alert('Passwords do not match');
        }
        else {
            const data = new FormData(event.target);
            console.log(stringifyFormData(data));
            fetch('/api/user/registration', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: stringifyFormData(data),
            });
            window.location.href = '/login?code=successful';
        }
    }

    updateUpdatePassword = (event) => {
        event.preventDefault();
        if(this.state.password != this.state.passwordConfirm) {
            event.target.setCustomValidity("Passwords do not match"); 
        }
        else {
            event.target.setCustomValidity("");
        }
    }

    updateInput = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value
        })
        console.log(this.state)
    }

    render() {
        return(
            <div>
                <form onSubmit = {this.registerHandleSubmit} onChange={this.updateInput}>
                    <input type="text" id="fName" name="fName" required="required" placeholder="First Name" />
                    <input type="text" id="lName" name="lName" required="required" placeholder="Last Name" />
                    <input type="date" id="dob" name="dob" required="required" placeholder="Date of Birth" />
                    <input type="email" id="email" name="email" required="required" placeholder="Email" />
                    <input type="password" id = "password" name="password" required="required" placeholder="Password" />
                    <input type="password"  id = "passwordConfirm" name="passwordConfirm" required="required" placeholder="Confirm your password"/>
                    <input type="submit" className="button" value="Register"/>
                </form>
            </div>
        );
    }
}
const windowElement = document.getElementById('RegisterForm');
ReactDOM.render(e(Register),windowElement);

function stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
}