import firebase from "firebase";
var config = {
  apiKey: "AIzaSyAzAZopNHNu9wE2hjy_jnKGsQtSQO0i2q4",
  authDomain: "board-game-library-8d42f.firebaseapp.com",
  databaseURL: "https://board-game-library-8d42f.firebaseio.com",
  storageBucket: "board-game-library-8d42f.appspot.com",
  messagingSenderId: "685292066677"
};
var fire = firebase.initializeApp(config);
export default fire;
