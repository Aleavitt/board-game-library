import React, { Component } from "react";
import "./App.css";
import fire from "./firebase";
import Bookshelf from "./components/bookshelf";
import BGNavbar from "./components/bgNavbar";
import { Redirect } from "react-router-dom";

const gameTemplate = {
  name: "",
  description: "",
  length: { min: 0, max: 0 },
  numPlayers: { min: 0, max: 0 },
  officialRating: 0,
  userRating: 0,
  backgroundURL: "Generic-Board-Game-Card.png",
  playedFlag: false,
  tags: []
};

class App extends Component {
  constructor(props) {
    console.log("Constructor props", props);
    super(props);
    this.state = {
      games: [],
      gameCache: { ...gameTemplate },
      setAddGameModalShow: false,
      filters: [".*"],
      userTags: ["Strategy"]
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
      let games = [...this.state.games];
      Object.keys(dbGames).map(key => {
        let game = dbGames[key];
        game.key = key;
        games.push(game);
      });
      this.setState({ games });
      console.log("Game State Set:", this.state);
      return games;
    });

    let userTags = fire
      .database()
      .ref("users/" + this.props.user.uid + "/tags");

    userTags.once("value", snapshot => {
      let dbTags = snapshot.val();
      let userTags = [];
      if (dbTags == null) {
        return {};
      }
      console.log("DbTags", dbTags);
      Object.values(dbTags).map(tag => {
        userTags.push(tag);
      });
      this.setState({ userTags });
      return userTags;
    });
  }

  handleFormChange = event => {
    let game = this.state.gameCache;
    game[event.target.name] = event.target.value;
    this.setState({ gameCache: game });
  };
  handleTagChange = event => {
    let tag = event.target.getAttribute("tag");
    let gameCache = this.state.gameCache;
    let tagIndex;
    // Check for old games that don't have tags
    if (!gameCache.tags) {
      gameCache.tags = [];
    }
    tagIndex = gameCache.tags.indexOf(tag);

    if (event.target.checked && !gameCache.tags.includes(tag)) {
      gameCache.tags.push(tag);
    } else if (!event.target.checked && tagIndex > -1) {
      gameCache.tags.splice(tagIndex, 1);
    }
    this.setState({ gameCache });
  };
  togglePlayedTag = uniqueId => {
    let games = this.state.games;
    let game = {};
    let gameFound = false;
    console.log("Current Game", game.name);
    console.log("PlayedFlage", game.playedFlag);
    for (let i = 0; i < games.length; i++) {
      let currentGame = games[i];
      if (currentGame.key == uniqueId) {
        gameFound = true;
        games[i].playedFlag = !games[i].playedFlag;
        game = games[i];
        break;
      }
    }
    if (!gameFound) {
      alert("Game not found. Update not saved");
      return false;
    }
    this.setState({
      games
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

  saveGame = e => {
    e.preventDefault();
    this.setAddGameModalShow(false);
    const uniqueId = Math.floor(Math.random() * 10000000 + 1);
    let game = this.state.gameCache;
    game.length = { min: game.lengthMin || 0, max: game.lengthMax || 0 };
    game.numPlayers = { min: game.playerMin || 0, max: game.playerMax || 0 };
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
      gameCache: { ...gameTemplate }
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
  sanitizeSearchInput = input => {
    return input.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
  };
  handleSearchInput = event => {
    let filters = [...this.state.filters],
      input = event.target.value;

    if (input === "") {
      filters[0] = ".*";
    } else {
      filters[0] = this.sanitizeSearchInput(input);
    }
    this.setState({ filters });
    return;
  };
  handleTagSearch = event => {
    let tag = event.target.getAttribute("tag");
    let filters = [...this.state.filters];
    let tagIndex = filters.indexOf(tag);
    let checked = event.target.checked;
    // if box is checked
    if (checked) {
      if (filters[0] === ".*") {
        filters[0] = "(?=a)b";
      }

      if (filters.includes(tag)) {
        return true;
      } else {
        filters.push(tag);
      }
    } // if box is being unchecked
    else if (!checked && tagIndex > -1) {
      // if the filter is still in the array delete it
      if (filters.includes(tag)) {
        filters.splice(tagIndex, 1);
      }
      // IF there are no other filters then reset it to all
      if (filters.length === 1 && filters[0] == "(?=a)b") {
        filters[0] = ".*";
      }
    }
    this.setState({ filters });
  };
  addTag = tag => {
    let userTags = [...this.state.userTags];

    if (!this.state.userTags.includes(tag)) {
      userTags.push(tag);
    }
    this.setState({ userTags });
    let saveTag = fire
      .database()
      .ref("users/" + this.props.user.uid + "/tags/");
    saveTag.set(userTags, function(error) {
      if (error) {
        console.log("Saving Tag Failed. Error: ", error);
      } else {
        console.log("Tag saved successfully");
      }
    });

    return true;
  };

  setEditGameModalShow = (toggle, game) => {
    console.log("Game To Show", game);
    game.playerMax = game.numPlayers.max;
    game.playerMin = game.numPlayers.min;
    game.lengthMax = game.length.max;
    game.lengthMin = game.length.min;
    this.setState({
      editGameModalShow: toggle,
      gameCache: game
    });
  };

  saveEdit = e => {
    e.preventDefault();
    console.log("Saving Edit");
    let game = this.state.gameCache;
    const uniqueId = game.key;
    game.length = { min: game.lengthMin, max: game.lengthMax };
    game.numPlayers = { min: game.playerMin, max: game.playerMax };
    game.key = uniqueId;
    delete game.playerMax;
    delete game.playerMin;
    delete game.lengthMax;
    delete game.lengthMin;

    console.log("Updated Game Object", game);
    let games = this.state.games;
    let gameFound = false;
    for (let i = 0; i < games.length; i++) {
      let currentGame = games[i];
      if (currentGame.key == uniqueId) {
        gameFound = true;
        games[i] = game;
      }
    }
    if (!gameFound) {
      alert("Game not found. Update not saved");
      return false;
    }
    this.setState({
      games,
      setModalShow: false,
      gameCache: { ...gameTemplate }
    });
    this.setEditGameModalShow(false, { ...gameTemplate });
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
        <BGNavbar
          userId={this.props.user.uid}
          games={this.state.games}
          saveGame={this.saveGame}
          handleFormChange={this.handleFormChange}
          handleTagSearch={this.handleTagSearch}
          onHide={() => this.setAddGameModalShow(false)}
          addGame={() => this.setAddGameModalShow(true)}
          setAddGameModalShow={this.state.setAddGameModalShow}
          handleLogout={this.props.handleLogout}
          handleSearchInput={this.handleSearchInput}
          addTag={this.addTag}
          userTags={this.state.userTags}
        />
        <Bookshelf
          userId={this.props.user.uid}
          games={this.state.games}
          deleteGame={this.deleteGame}
          filters={this.state.filters}
          addTag={this.addTag}
          setEditGameModalShow={this.setEditGameModalShow}
          editGameModalShow={this.state.editGameModalShow}
          handleFormChange={this.handleFormChange}
          saveEdit={this.saveEdit}
          gameTemplate={gameTemplate}
          gameCache={this.state.gameCache}
          userTags={this.state.userTags}
          handleTagChange={this.handleTagChange}
          togglePlayedTag={this.togglePlayedTag}
        />
      </>
    );
  }
}

export default App;
