import React, { Component } from 'react';
import {BrowserRouter as Router, Link , Route} from "react-router-dom";
import './App.css';
import HomePage from "./components/HomePage";
import UserPage from "./components/UserPage";
import SearchPage from "./components/SearchPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state=
            {
                user:
                    {
                        isLoggedIn:false,
                        username:""
                    }
            }
    }

    LoggingIn=(name,status)=>
    {
        this.setState({user:{username:name,isLoggedIn:status}});
    };


    render() {
    return (
      <div className="App">
        <h1>Welcome to Bleater</h1>
        <Router>
          <Link to={"/"}>Home</Link>
          <Link to={"/AccountPage"}>Account</Link>
          <Link to={"/Search"}>Search</Link>
          <Route exact path={"/"} component={()=><HomePage LoggingIn={this.LoggingIn} isLoggedIn={this.state.user.isLoggedIn}/>}/>
          <Route path={"/AccountPage"} component={()=><UserPage username={this.state.user.username} isLoggedIn={this.state.user.isLoggedIn}/>}/>
          <Route path={"/Search"} component={()=><SearchPage />}/>
        </Router>
      </div>
    );
  }
}

export default App;
