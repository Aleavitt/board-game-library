import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ReactSVG } from "react-svg";

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
      userRating,
      backgroundURL,
      playedFlag
    } = this.props.game;
    return (
      <Card
        className="card float-left m-2 bgTile"
        style={{
          backgroundImage: "url(" + backgroundURL + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "darkgrey",
          height: "250px",
          width: "20rem",
          display: this.showTile(this.props.game) ? null : "none"
        }}
      >
        <button
          className={
            "hiddenButton " + (playedFlag ? "btn-success" : "btn-danger")
          }
          onClick={this.props.togglePlayedTag}
        >
          {playedFlag ? "Played" : "Unplayed"}
        </button>
        <button
          className="hiddenButton btn-dark"
          variant="dark"
          onClick={() => this.props.setEditGameModalShow(true, this.props.game)}
        >
          Edit
        </button>
        <ReactSVG
          src="check.svg"
          beforeInjection={svg => {
            svg.classList.add("played-icon-svg");
          }}
          className="m-2 played-icon"
          viewBox="0 0 20 20"
          style={{ display: playedFlag ? "inline" : "none" }}
        />
        <Card.Body
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
        </Card.Body>
      </Card>
    );
  }
}

export default BgTile;
