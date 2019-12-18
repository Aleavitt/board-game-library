import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import AddGameModal from "./addGameModal";
//Stateless Functional Component - These don't ahve props by default. They are a parameter
// Can not use lifecycle hooks in Stateless Functional Components

class Navbar extends Component {
  render() {
    const {
      userId,
      handleChange,
      saveGame,
      games,
      onHide,
      setAddGameModalShow
    } = this.props;
    return (
      <nav className="navbar navbar-light bg-light">
        <Button variant="primary" onClick={this.props.addGame}>
          Add Game
        </Button>
        <button
          className="btn-primary btn float-left"
          onClick={this.props.handleLogout}
        >
          Logout
        </button>

        <AddGameModal
          setAddGameModalShow={setAddGameModalShow}
          onHide={onHide}
          userId={userId}
          handleChange={handleChange}
          saveGame={saveGame}
          games={games}
        />
      </nav>
    );
  }
}

export default Navbar;
