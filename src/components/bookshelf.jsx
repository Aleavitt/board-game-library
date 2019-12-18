import React, { Component } from "react";
import BgTile from "./bgTile";
import EditGameModal from "./editGameModal";

class Bookshelf extends Component {
  state = {
    editGameModalShow: false,
    editGameModalGame: {
      description: "A game inspired by birdwatching",
      key: 9117023,
      length: {
        max: "90",
        min: "15"
      },
      name: "Wingspan",
      numPlayers: {
        max: "5",
        min: "1"
      },
      officialRating: "8.3",
      userRating: "9"
    }
  };

  setEditGameModalShow = (toggle, gameKey) => {
    let gameToShow;
    console.log("Toggle", toggle, "Game Key", gameKey);
    for (let i = 0; i < this.props.games.length; i++) {
      let game = this.props.games[i];
      if (game.key == gameKey) {
        gameToShow = game;
        break;
      }
    }
    console.log("Game To Show", gameToShow);
    this.setState({
      editGameModalShow: toggle,
      editGameModalGame: gameToShow
    });
  };
  handleEdit = event => {
    console.log(event.target.value + "Edited");
  };
  saveEdit = e => {
    e.preventDefault();
    alert("Game Saved");
  };
  render() {
    const { games } = this.props;
    return (
      <div>
        {games.map(game => (
          <BgTile
            key={game.key}
            name={game.name}
            description={game.description}
            length={game.length}
            numPlayers={game.numPlayers}
            officialRating={game.officialRating}
            userRating={game.userRating}
            gameId={game.key}
            showGame={() => this.setEditGameModalShow(true, game.key)}
          />
        ))}
        <EditGameModal
          editGameModalShow={this.state.editGameModalShow}
          onHide={() => this.setEditGameModalShow(false, 9117023)}
          saveEdit={this.saveEdit}
          game={this.state.editGameModalGame}
          handleEdit={this.handleEdit}
          deleteGame={this.props.deleteGame}
        />
      </div>
    );
  }
}

export default Bookshelf;
