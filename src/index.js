import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import fire from "./firebase";
import Login from "./Login";
import App from "./App";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

class Main extends Component {
  constructor(props) {
    //THIS IS SUPPOSED TO CHECK TO SEE IF YOU ARE CURRENTLY LOGGEDIN INSTEAD OF TAKING A COUPLE OF DETOURS, BUT IT DOESN"T WORK
    super(props);
    let user = fire.auth().currentUser;
    console.log("Main User Constructor", user);
    if (user) {
      this.state = {
        isLoggedIn: true,
        setLoggedIn: {},
        user: user
      };
    } else {
      this.state = {
        isLoggedIn: false,
        setLoggedIn: {},
        user: {}
      };
    }
  }
  handleLogin = user => {
    console.log("HandleLogin", !!user);
    this.setState({ user: user, isLoggedIn: !!user });
  };
  handleLogout = () => {
    console.log("HandleLogout");
    fire.auth().signOut();
    this.setState({ user: {}, isLoggedIn: false });
  };
  render() {
    return (
      <>
        <Router basename="/">
          <Route
            exact
            path={"/"}
            render={() => (
              <App
                isLoggedIn={this.state.isLoggedIn}
                setLoggedIn={this.state.setLoggedIn}
                handleLogout={this.handleLogout}
                user={this.state.user}
              />
            )}
          />
          <Switch>
            <Route
              exact
              path={"/login"}
              render={() => (
                <Login
                  isLoggedIn={this.state.isLoggedIn}
                  setLoggedIn={this.state.setLoggedIn}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  user={this.state.user}
                />
              )}
            />
            <Route
              exact
              path="/library"
              render={() => (
                <App
                  isLoggedIn={this.state.isLoggedIn}
                  setLoggedIn={this.state.setLoggedIn}
                  handleLogout={this.handleLogout}
                  user={this.state.user}
                />
              )}
            />
          </Switch>
        </Router>
      </>
    );
  }
}

export default Main;

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
