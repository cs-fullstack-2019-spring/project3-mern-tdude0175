import React, {Component} from "react"

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state=
            {
                bleats:[]
            }
    }

    componentDidMount() {
        this.getBleats()
    }

    getBleats =() =>
    {
        fetch("bleats/")
            .then(data =>
                // console.log(data);
                data.json()
            )
            // .then(data => console.log(data))
            .then(string => this.setState({bleats:string}))
    };

    loginConfirm = (e) => {
        e.preventDefault();
        fetch("users/login",
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                        username: e.target.username.value.toLowerCase(),
                        password: e.target.password.value
                    }
                )
            })
            .then(data => data.text())
            .then( response =>
            {
                if(response!== null) {
                    this.props.LoggingIn(response, true)
                }
            })
    };

    render() {
        console.log(this.state.bleats);
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <h1>Home Page</h1>
                    {this.state.bleats}
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Sign In Page</h1>
                    <form onSubmit={this.loginConfirm}>
                        <p>
                            <label htmlFor={"username"}>Username:</label>
                            <input id={"username"} name={"username"} type="text"/>
                        </p>
                        <p>
                            <label htmlFor={"password"}>Password:</label>
                            <input id={"password"} name={"password"} type="password"/>
                        </p>
                        <button>Submit</button>
                    </form>
                    {this.state.bleats}
                </div>
            )
        }
    }
}