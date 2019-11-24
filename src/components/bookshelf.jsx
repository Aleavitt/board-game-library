import React, { Component } from "react";
import BgTile from "./bgTile";

class Bookshelf extends Component {
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
          />
        ))}
      </div>
    );
  }
}

export default Bookshelf;
