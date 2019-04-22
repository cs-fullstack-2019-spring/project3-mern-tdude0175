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
            .then(string => this.setState({bleats:string}));

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
                        username: e.target.username.value,
                        password: e.target.password.value
                    }
                )
            })
            .then(data => data.text())
            .then( response =>
            {
                if(response === "failed to get through login") {
                    console.log("failed to log in")
                }
                else{
                    this.props.LoggingIn(response, true)
                }
            })
    };

    render() {
        var mapData = this.state.bleats.map((Item)=>
        {
            return(
                <div key={Item.bleat._id}>
                    <h3>{Item.username}</h3>
                    {Item.bleat.message}
                </div>
            )
        });
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <h1>Home Page</h1>
                    {mapData}
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
                    {mapData}
                </div>
            )
        }
    }
}