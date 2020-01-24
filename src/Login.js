import React from "react";
import firebase from "firebase/app";
import fire from "./firebase";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import styles from "./App.css"; // This uses CSS modules.
import "./firebaseui-styling.global.css"; // Import globally.
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        console.log("signInSuccess");
        console.log("users/" + authResult.user.uid);
        let user = authResult.user;
        let uid = user.uid;
        let userFolder = fire.database().ref("users/" + uid);
        userFolder.once("value", function(snapshot) {
          if (snapshot.exists()) {
            console.log("users/" + uid + "exists");
            return false;
          } else {
            console.log("Creating New Folder Return");
            userFolder
              .set({
                info: {
                  displayName: user.displayName,
                  email: user.email,
                  uid: uid
                }
              })
              .then(console.log("Folder Created"))
              .catch(function(error) {
                console.log("Folder Creation Failed:", error);
              });
          }
        });
        return false;
      }
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("Logged in");
        this.props.handleLogin(user);
      } else {
        console.log("Logged out");
        this.props.handleLogout();
      }
    });
  }

  render() {
    if (this.props.isLoggedIn === true) {
      return (
        <Redirect
          to={{
            pathname: "/library"
          }}
        />
      );
    } else {
      return (
        <div className="container" style={{ color: "lightgray" }}>
          <h1>Board Game Library Manager</h1>

          {this.props.isLoggedIn !== undefined && !this.props.isLoggedIn && (
            <div>
              <StyledFirebaseAuth
                className={styles.firebaseUi}
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          )}
        </div>
      );
    }
  }
}

export default Login;
