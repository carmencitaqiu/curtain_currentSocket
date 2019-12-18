import React, { Component } from "react";
import { withRouter } from "react-router";
import { inject } from "mobx-react";

@inject("deviceStore")
class App extends Component {
  componentDidMount() {
    const { history, deviceStore } = this.props;
    history.listen(route => {
      deviceStore.listenToHashChange(route);
    });
  }
  render() {
    return null;
  }
}
export default withRouter(App);
