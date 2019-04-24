import React, {Component} from "react"
var tweetDisplay = 5;
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                bleats: [],
                tweetDisplay:5
            }
    }

    componentDidMount() {
        this.getBleats()
    }

    getBleats = () => {
        fetch("bleats/")
            .then(data =>
                // console.log(data);
                data.json()
            )
            // .then(data => console.log(data))
            .then(string => this.setState({bleats: string.slice(0, this.state.tweetDisplay)}));

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
            .then(response => {
                if (response === "failed to get through login") {
                    console.log("failed to log in")
                } else {
                    this.props.LoggingIn(response, true)
                }
            })
    };

    changeBleatDisplay =(e)=>
    {
        this.setState({tweetDisplay:e.target.value});
        this.getBleats()
    };

    render() {
        // console.log(this.state.bleats);
        var mapData = this.state.bleats.map((Item) => {
            console.log(Item);
            if (Item.bleat.picture) {
                return (
                    <div className={"bleat"} key={Item.bleat._id}>
                        <img src={Item.bleat.picture} alt={Item.username}/>
                        <h3>{Item.username}</h3>
                       <p>{Item.bleat.message} </p>
                    </div>
                )
            } else {
                return (
                    <div className={"bleat"} key={Item.bleat._id}>
                        <h3>{Item.username}</h3>
                       <p>{Item.bleat.message} </p>
                    </div>
                )
            }
        });
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <h1>Home Page</h1>
                    <p>
                        <button value={5} onClick={this.changeBleatDisplay}>5</button>
                        <button value={10} onClick={this.changeBleatDisplay}>10</button>
                        <button value={20} onClick={this.changeBleatDisplay}>20</button>
                    </p>
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
                    <p>
                        <button value={5} onClick={this.changeBleatDisplay}>5</button>
                        <button value={10} onClick={this.changeBleatDisplay}>10</button>
                        <button value={20} onClick={this.changeBleatDisplay}>20</button>
                    </p>
                    {mapData}
                </div>
            )
        }
    }
}