import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class BgTile extends Component {
  render() {
    const {
      name,
      description,
      length,
      numPlayers,
      officialRating,
      userRating
    } = this.props;
    return (
      <div
        className="card float-left m-2"
        style={{
          backgroundImage: "url(Generic-Board-Game-Card.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "250px",
          width: "20rem"
        }}
      >
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
