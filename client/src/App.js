import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import './App.css';
import HomePage from "./components/HomePage";
import UserPage from "./components/UserPage";
import SearchPage from "./components/SearchPage";
import EditPage from "./components/EditPage";

class App extends Component {
    // saves the state of the user being logged in and their username
    constructor(props) {
        super(props);
        this.state =
            {
                bleatId: "",
                user:
                    {
                        isLoggedIn: false,
                        username: "",
                    }
            }
    }
    // a function to change the state of the user wether they are logged in or not
    LoggingIn = (name, status) => {
        this.setState({user: {username: name, isLoggedIn: status}});
    };
    // function to grab a bleats id to send to the edit route to grab the correct bleat
    saveBleatId = (id) => {
        this.setState({bleatId: id})
    };

    render() {
        return (
            <div className="App">
                <h1>Welcome to Bleater</h1>
                <Router>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/AccountPage"}>Account</Link>
                    <Link to={"/Search"}>Search</Link>
                    <Route exact path={"/"} component={() => <HomePage LoggingIn={this.LoggingIn}
                                                                       isLoggedIn={this.state.user.isLoggedIn}/>}/>
                    <Route path={"/AccountPage"}
                           component={() => <UserPage LoggingIn={this.LoggingIn} username={this.state.user.username}
                                                      saveBleatId={this.saveBleatId}
                                                      isLoggedIn={this.state.user.isLoggedIn}/>}/>
                    <Route path={"/Search"} component={() => <SearchPage/>}/>
                    <Route exact path={"/edit"} component={() => <EditPage username={this.state.user.username}
                                                                           bleatId={this.state.bleatId}/>}/>
                </Router>
            </div>
        );
    }
}

export default App;
