import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
//The component that owns the part of the state that needs to be modified should be the one modifying it
class Counter extends Component {
  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Previous Props", prevProps);
    console.log("Previous State", prevState);
    if (prevProps.counter.value !== this.props.counter.value) {
      console.log("value updated");
    }
  }
  componentWillUnmount() {
    //Clear any timers or event listeners from this component here. This will prevent memory leaks
    console.log("Counter - Unmounted");
  }
  render() {
    console.log("counter - rendered");
    // use object destructuring to not have to write this.props every time I want to use these
    const { counter, onIncrement, onDelete } = this.props;
    return (
      <>
        <h4>Counter # {counter.id}</h4>
        <h1 className={this.getBadgeClasses()}>{this.formatCount()}</h1>
        <button onClick={() => onIncrement(counter)} className="btn ">
          Increment
        </button>
        <button
          onClick={() => onDelete(counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </>
    );
  }
}

export default Counter;
