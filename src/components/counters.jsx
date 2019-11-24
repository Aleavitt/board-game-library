import React, { Component } from "react";
import Counter from "./counter";
import "bootstrap/dist/css/bootstrap.css";
//The component that owns the part of the state that needs to be modified should be the one modifying it
class Counters extends Component {
  render() {
    console.log("counters - rendered");
    // use object destructuring to not have to write this.props every time I want to use these
    const { onReset, onDelete, onIncrement, counters } = this.props;
    return (
      <div>
        <button
          key="reset-button"
          onClick={onReset}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>
        {counters.map(counter => (
          <Counter
            key={counter.id}
            counter={counter}
            onDelete={onDelete}
            onIncrement={onIncrement}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
