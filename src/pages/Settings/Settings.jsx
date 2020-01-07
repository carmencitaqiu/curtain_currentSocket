import React, { Component } from "react";
import { inject } from "mobx-react";
import { withRouter } from "react-router";
import MainPage from "../../comm/MainPage";
import Inner from "./Inner";
import ModalDelDevice from "./ModalDelDevice";

import "./index.less";

@inject("deviceStore")
@withRouter
class Settings extends Component {
  check() {
    const { history, deviceStore } = this.props;
    if (history.location.pathname === "/Settings/ModalDelDevice") {
      deviceStore.showDelDeviceModal();
    } else {
      deviceStore.hideDelDeviceModal();
    }
  }
  componentDidMount() {
    this.check();
  }
  componentDidUpdate() {
    this.check();
  }
  render() {
    return (
      <MainPage>
        <Inner />
        <ModalDelDevice />
      </MainPage>
    );
  }
}
export default Settings;
