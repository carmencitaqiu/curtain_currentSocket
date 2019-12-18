import React, { Component } from "react";

class MainPage extends Component {
  render() {
    return (
      <div className="container-wrap">
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}
export default MainPage;
