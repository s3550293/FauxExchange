const e = React.createElement;
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password:'',
            passwordConfirm:''
        }
    }

    loginHandleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        console.log(stringifyFormData(data));
        fetch('/api/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: stringifyFormData(data),
        });
        alert('Login successful');
        window.location.href = '/currencies';
    }


    render() {
        return(
            <div>
                <form onsubmit= {this.loginHandleSubmit}>
                    <input type="email" name="email" required="required" placeholder="Email" />
                    <input type="password" name="password" required="required" placeholder="Password" />
                    <input type="submit" class="button" value="Login" style="width: 100%;"/>
                </form>
            </div>
        );
    }
}
const windowElement = document.getElementById('LoginForm');
ReactDOM.render(e(Register),windowElement);

function stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
}