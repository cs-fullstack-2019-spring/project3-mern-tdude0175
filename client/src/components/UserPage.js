import React, {Component} from "react"
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

export default class UserPage extends Component {
    // message is for if a person adds a bleat or successfully makes a user
    // personal bleats is logged in users bleats
    // picutres is background image and profile picture
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            personalBleats: [],
            pictures:{}
        }
    }
    //gets the persons bleats and pictures if they are logged in
    componentDidMount() {
        this.gatherBleats();
        if(this.props.isLoggedIn)
        this.getPictures();
    }
    // fetches from proxy for the users pictures
    getPictures=()=>
    {
        console.log("DUN DUN DUNNNN");
        fetch("/users/profilePictures",
            {
                method:"POST",
                headers:
                    {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                body:JSON.stringify(
                    {
                        username:this.props.username,
                    })
            })
            .then(data => data.json())
            .then(response =>{
                console.log(response);
                this.setState({pictures:response})
            });
        console.log(this.state.pictures)
    };
    // allows the person to log out
    logout=()=>
    {
      console.log("logging Out");
      fetch("/users/logout");
      this.props.LoggingIn("",false)
    };
    // goes and creates the user in the database
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
                    profilePicture: e.target.profilePicture.value,
                    backgroundImage: e.target.background.value,
                })
        })
            .then(data => data.text())
            .then(response => this.setState({message: response}));
    };
    // lets the person make a bleat then when they make a bleat adds it to the list
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
                        picture: e.target.picture.value,
                    })
            })
            .then(data=> data.text())
            .then(response => this.setState({message:response}));
        this.gatherBleats()
    };

    // gathers all of the persons bleats that is logged in
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
    //  send up the bleats id for the edit page to get the correct bleat to edit
    editIdUpdate=(e)=>
    {
        // console.log(e.target.name);
        this.props.saveBleatId(e.target.name)
    };

    render() {
        if (this.props.isLoggedIn) {
            if(this.state.pictures.profilePicture)
            {
                var picture = <img src={this.state.pictures.profilePicture} alt={this.props.username} width={"20%"} height={"20%"}/>
            }
            if(this.state.pictures.backgroundImage)
            {
                var background = <img className={"Background"} src={this.state.pictures.backgroundImage} alt={this.props.username} height={"5%"} width={"50%"}/>
            }
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
                    {background}
                    <h1>Welcome {this.props.username}!</h1>
                    {picture}
                    <p><button onClick={this.logout}>LogOut</button></p>
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
                            <label htmlFor={"picture"}>Image:</label>
                            <input name={"picture"} id={"picture"} type="text"/>
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