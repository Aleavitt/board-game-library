import React, { Component } from "react";

class SearchBar extends Component {
  state = {};

  render() {
    return (
      <input
        type="text"
        placeholder="Search..."
        onKeyUp={this.props.handleSearchInput}
      ></input>
    );
  }
}

export default SearchBar;
