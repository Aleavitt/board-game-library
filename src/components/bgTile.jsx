import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class BgTile extends Component {
  showTile = game => {
    let regExp = new RegExp(this.props.filters.join("|"), "ig");
    let tags = game.tags || [];
    // FOR SOME REASON I HAVE TO SET IT AS  A VARIABLE BECAUSE WHEN I JUST DROP THAT EXPRESSION IN THE IF STATEMENT IT WILL NEVER RETURN TRUE
    let nameContains = regExp.test(game.name);
    if (nameContains) {
      return true;
    }
    //Check all tags for regexp after name
    for (let i = 0; i < tags.length; i++) {
      let tagContains = regExp.test(tags[i]);
      if (tagContains) {
        return true;
      }
    }
    return false;
  };
  handleMouseOver = () => {};
  render() {
    const {
      name,
      description,
      length,
      numPlayers,
      officialRating,
      userRating
    } = this.props.game;
    return (
      <div
        className="card float-left m-2 bgTile"
        style={{
          backgroundImage: "url(Generic-Board-Game-Card.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "darkgrey",
          height: "250px",
          width: "20rem",
          display: this.showTile(this.props.game) ? null : "none"
        }}
      >
        <button
          className="hiddenButton"
          variant="dark"
          onClick={() => this.props.setEditGameModalShow(true, this.props.game)}
        >
          Edit
        </button>
        <div
          className="card-body p-1  bg-dark text-light"
          style={{
            opacity: 0.9,
            position: "absolute",
            bottom: 0,
            height: "40%",
            width: "100%",
            fontSize: "6",
            onHover: {
              opacity: 1.0
            }
          }}
        >
          <h5 className="card-title mb-0">{name}</h5>
          <p className="card-text text-truncate mb-0">{description}</p>
          <div className="mr-1 float-left">
            {"Length: " + length.min + "-" + length.max}
          </div>
          <div className="mr-1 float-left">
            {"# Players: " + numPlayers.min + "-" + numPlayers.max}
          </div>
          <div className="mr-1 float-left">{"Rating: " + officialRating}</div>
          <div className="mr-1 float-left">{"User Rating: " + userRating}</div>
        </div>
      </div>
    );
  }
}

export default BgTile;
