import React from "react";
//Stateless Functional Component - These don't ahve props by default. They are a parameter
// Can not use lifecycle hooks in Stateless Functional Components
const Navbar = ({ totalCounters }) => {
  console.log("Navbar - Rendered");
  return (
    <nav className="navbar navbar-light bg-light">
      <button onClick={addGame} className="btn btn-primary md">
        Add Game
      </button>
      <span className="navbar-brand m-2 h1">
        Game Library
        <span className="badge badge-pill badge-secondary m-2">
          {totalCounters}
        </span>
      </span>
    </nav>
  );
};

export default Navbar;
