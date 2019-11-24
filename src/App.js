import React, { Component } from "react";
import "./App.css";
import fire from "./firebase";
import Bookshelf from "./components/bookshelf";
import Navbar from "./components/navbar";

class App extends Component {
  state = {
    games: [],
    game: {
      name: "",
      description: "",
      lengthMax: 0,
      lengthMin: 0,
      playerMax: 0,
      playerMin: 0,
      officialRating: 0,
      userRating: 0
    },
    setModalShow: false
  };

  componentDidMount() {
    let games = fire
      .database()
      .ref("users/" + this.props.userId + "/boardGames");

    games.once("value", snapshot => {
      let dbGames = snapshot.val();
      console.log("DBGamesObject:", dbGames);
      Object.keys(dbGames).map(key => {
        let games = [...this.state.games];
        let game = dbGames[key];
        game.key = key;
        games.push(game);
        this.setState({ games });
      });
      console.log("Game State Set:", this.state);
    });
  }

  handleChange = event => {
    let game = this.state.game;
    game[event.target.name] = event.target.value;
    this.setState({ game });
  };

  saveGame = e => {
    e.preventDefault();
    const uniqueId = Math.floor(Math.random() * 10000000 + 1);
    let game = this.state.game;
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
      game: {
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
      .ref("users/" + this.props.userId + "/boardGames/" + uniqueId);
    saveGame.set(game, function(error) {
      if (error) {
        console.log("Saving Game Failed. Error: ", error);
      } else {
        console.log("Games saved successfully");
      }
    });
  };

  render() {
    let setModalShow = toggle => this.setState({ setModalShow: toggle });
    return (
      <>
        <script src="/__/firebase/7.5.0/firebase-app.js"></script>
        <script src="/__/firebase/7.5.0/firebase-analytics.js"></script>
        <script src="/__/firebase/7.5.0/firebase-auth.js"></script>
        <script src="/__/firebase/7.5.0/firebase-firestore.js"></script>
        <Navbar
          userId={this.props.userId}
          games={this.state.games}
          saveGame={this.saveGame}
          handleChange={this.handleChange}
          onHide={() => setModalShow(false)}
          addGame={() => setModalShow(true)}
          setModalShow={this.state.setModalShow}
        />
        <Bookshelf userId={this.props.userId} games={this.state.games} />
      </>
    );
  }
}

export default App;
