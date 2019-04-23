import React, {Component} from "react"
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            personalBleats: []
        }
    }

    componentDidMount() {
        this.gatherBleats()
    }

    logout=()=>
    {
      console.log("logging Out");
      fetch("/users/logout");
      this.props.LoggingIn("",false)
    };

    createAccount = (e) => {
        e.preventDefault();
        fetch("users/addUser", {
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
            .then(response => this.setState({message: response}));
    };

    makeABleat = (e) => {

        e.preventDefault();
        fetch("bleats/addBleat",
            {
                method: "POST",
                headers:
                    {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                body: JSON.stringify(
                    {
                        username: this.props.username,
                        message: e.target.message.value,
                        private: e.target.private.checked,
                    })
            })
            .then(data=> data.text())
            .then(response => this.setState({message:response}));
        this.gatherBleats()
    };

    gatherBleats=()=>
    {
        console.log("getting your bleats");
        if(this.props.username !== '')
        {
           fetch("/bleats/findBleats",
               {
                   method:"POST",
                   headers:
                       {
                           "Accept": "application/json",
                           "Content-type": "application/json"
                       },
                   body: JSON.stringify(
                       {
                           username: this.props.username,
                       })
               })
               .then(data => data.json())
               .then(response => this.setState({personalBleats:response}))
        }
        else
            {
                console.log("Wait are you supposed to be here??")
            }
    };

    editIdUpdate=(e)=>
    {
        // console.log(e.target.name);
        this.props.saveBleatId(e.target.name)
    }

    render() {
        if (this.props.isLoggedIn) {
            console.log(this.state.personalBleats);
            let mappedBleats = this.state.personalBleats.map((bleat)=>
            {
                return(
                    <div key={bleat._id}>
                        <p>
                        {bleat.message}
                        <Link to={"/edit"}><button name={bleat._id} onClick={this.editIdUpdate}>Edit</button></Link>
                        </p>
                    </div>
                )
            });
            return (
                <div>
                    <h1>Welcome {this.props.username}!</h1>
                    <button onClick={this.logout}>LogOut</button>
                    <form onSubmit={this.makeABleat}>
                        <p>
                            <input id={"message"} name={"message"} type="text"
                                   placeholder={"Bleat About Something!!"}/>
                        </p>
                        <p>
                            <label htmlFor={"private"}>Private?</label>
                            <input name={"private"} id={"private"} type="checkbox"/>
                        </p>
                        <p>
                            <label htmlFor={"image"}>Image:</label>
                            <input name={"image"} id={"image"} type="text"/>
                        </p>
                        <button>Bleat!!</button>
                    </form>
                    {this.state.message}
                    <hr/>
                        {mappedBleats}
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