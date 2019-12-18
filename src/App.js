import React, { Component } from "react";
import "./App.css";
import fire from "./firebase";
import Bookshelf from "./components/bookshelf";
import Navbar from "./components/navbar";
import { Redirect } from "react-router-dom";

class App extends Component {
  constructor(props) {
    console.log("Constructor props", props);
    super(props);
    this.state = {
      games: [],
      gameTemplate: {
        name: "",
        description: "",
        lengthMax: 0,
        lengthMin: 0,
        playerMax: 0,
        playerMin: 0,
        officialRating: 0,
        userRating: 0,
        tags: {}
      },
      setAddGameModalShow: false
    };
  }

  componentDidMount() {
    let games = fire
      .database()
      .ref("users/" + this.props.user.uid + "/boardGames");

    games.once("value", snapshot => {
      let dbGames = snapshot.val();
      if (dbGames == null) {
        return {};
      }
      Object.keys(dbGames).map(key => {
        let games = [...this.state.games];
        let game = dbGames[key];
        game.key = key;
        games.push(game);
        this.setState({ games });
        return games;
      });
      console.log("Game State Set:", this.state);
    });
  }

  handleChange = event => {
    let game = this.state.gameTemplate;
    game[event.target.name] = event.target.value;
    this.setState({ gameTemplate: game });
  };

  saveGame = e => {
    e.preventDefault();
    this.setAddGameModalShow(false);
    const uniqueId = Math.floor(Math.random() * 10000000 + 1);
    let game = this.state.gameTemplate;
    game.length = { min: game.lengthMin, max: game.lengthMax };
    game.numPlayers = { min: game.playerMin, max: game.playerMax };
    game.key = uniqueId;
    delete game.playerMax;
    delete game.playerMin;
    delete game.lengthMax;
    delete game.lengthMin;

    console.log("Game to be added: ", game);
    let games = this.state.games;
    games.push(game);
    console.log("Games: ", games);
    this.setState({
      games,
      setModalShow: false,
      gameTemplate: {
        name: "",
        description: "",
        lengthMax: 0,
        lengthMin: 0,
        playerMax: 0,
        playerMin: 0,
        officialRating: 0,
        userRating: 0
      }
    });
    let saveGame = fire
      .database()
      .ref("users/" + this.props.user.uid + "/boardGames/" + uniqueId);
    saveGame.set(game, function(error) {
      if (error) {
        console.log("Saving Game Failed. Error: ", error);
      } else {
        console.log("Game saved successfully");
      }
    });
  };

  deleteGame = e => {
    alert("I'm sorry. I can't do that " + this.props.user.displayName);
  };
  setAddGameModalShow = toggle => {
    this.setState({ setAddGameModalShow: toggle });
  };

  addtag = (gameKey, newTag) => {
    let gameToShow;
    for (let i = 0; i < this.state.games.length; i++) {
      let game = { ...this.state.games[i] };
      if (game.key == gameKey) {
        gameToShow = game;
        break;
      }
    }
  };

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <script src="/__/firebase/7.5.0/firebase-app.js"></script>
        <script src="/__/firebase/7.5.0/firebase-analytics.js"></script>
        <script src="/__/firebase/7.5.0/firebase-auth.js"></script>
        <script src="/__/firebase/7.5.0/firebase-firestore.js"></script>
        <Navbar
          userId={this.props.user.uid}
          games={this.state.games}
          saveGame={this.saveGame}
          handleChange={this.handleChange}
          onHide={() => this.setAddGameModalShow(false)}
          addGame={() => this.setAddGameModalShow(true)}
          setAddGameModalShow={this.state.setAddGameModalShow}
          handleLogout={this.props.handleLogout}
        />
        <Bookshelf
          userId={this.props.user.uid}
          games={this.state.games}
          deleteGame={this.deleteGame}
        />
      </>
    );
  }
}

export default App;
