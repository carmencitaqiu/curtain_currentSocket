import React, { Component } from "react";

class Head extends Component {
  render() {
    return <div className="Setting-top">{this.props.children}</div>;
  }
}
export default Head;
