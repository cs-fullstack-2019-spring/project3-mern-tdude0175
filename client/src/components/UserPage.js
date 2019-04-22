import React, {Component} from "react"

export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        }
    }


    createAccount = (e) => {
        e.preventDefault();
        fetch("/users/addUser", {
            method: "POST",
            headers:
                {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
            body: JSON.stringify(
                {
                    username: e.target.username.value,
                    password: e.target.password.value,
                })
        })
            .then(data => data.text())
            .then(response => this.setState({message:response}));
    };

    render() {
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <h1>User Page</h1>
                    <form>
                        <p>
                            <input type="text" placeholder={"Bleat About Something!!"}/>
                        </p>
                        <p>
                            <label htmlFor={"private"}>Private?</label>
                        <input name={"private"} id={"private"} type="checkbox"/>
                        </p>
                        <button>Bleat!!</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Create Account Page</h1>
                    <form onSubmit={this.createAccount}>
                        <p>
                            <label htmlFor={"username"}>Username:</label>
                            <input id={"username"} name={"username"} type="text"/>
                        </p>
                        <p>
                            <label htmlFor={"password"}>Password:</label>
                            <input id={"password"} name={"password"} type="password"/>
                        </p>
                        <p>
                            <label htmlFor={"profilePicture"}>Profile Picture:</label>
                            <input id={"profilePicture"} name={"profilePicture"} type="text" placeholder={"Optional"}/>
                        </p>
                        <p>
                            <label htmlFor={"background"}>BackgroundImage:</label>
                            <input id={"background"} name={"background"} type="text" placeholder={"Optional"}/>
                        </p>
                        <button>Submit</button>
                    </form>
                    {this.state.message}
                </div>
            );
        }
    }
}