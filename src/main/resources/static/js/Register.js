const e = React.createElement;
var i = 0;
class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    registerHandleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(stringifyFormData(data));
        fetch('/api/user/registration', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: stringifyFormData(data),
        });
        alert('Registration successful');
    }

    render() {
        return(
            <div>
                <form onSubmit = {this.registerHandleSubmit}>
                    <input type="text" name="fName" required="required" placeholder="First Name" />
                    <input type="text" name="lName" required="required" placeholder="Last Name" />
                    <input type="date" name="dob" required="required" placeholder="Date of Birth" />
                    <input type="email" name="email" required="required" placeholder="Email" />
                    <input type="password" name="password" required="required" placeholder="Password" />
                    <input type="submit" class="button" value="Register"/>
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