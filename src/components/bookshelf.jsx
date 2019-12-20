import React, { Component } from "react";
import BgTile from "./bgTile";
import EditGameModal from "./editGameModal";

class Bookshelf extends Component {
  render() {
    const { games } = this.props;
    return (
      <div className="bookshelf">
        {games.map(game => (
          <BgTile
            key={game.key}
            game={game}
            gameId={game.key}
            setEditGameModalShow={this.props.setEditGameModalShow}
            filters={this.props.filters}
          />
        ))}
        <EditGameModal
          editGameModalShow={this.props.editGameModalShow}
          onHide={() =>
            this.props.setEditGameModalShow(false, {
              ...this.props.gameTemplate
            })
          }
          saveEdit={this.props.saveEdit}
          game={this.props.gameCache}
          handleFormChange={this.props.handleFormChange}
          handleTagChange={this.props.handleTagChange}
          deleteGame={this.props.deleteGame}
          userTags={this.props.userTags}
        />
      </div>
    );
  }
}

export default Bookshelf;
