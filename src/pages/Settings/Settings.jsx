import React, { Component } from "react";
import { inject } from "mobx-react";
import { withRouter } from "react-router";
import MainPage from "../../comm/MainPage";
import Head from "./Head";
import Inner from "./Inner";
import "./style.less";

@inject("deviceStore")
@withRouter
class Settings extends Component {
  check() {
    const { history, deviceStore } = this.props;
    // NOTE 如果是需要弹出弹出框修改设备名称时
    if (history.location.pathname === "/Settings/DeviceName") {
      deviceStore.showDeviceName();
    } else {
      deviceStore.hideDeviceName();
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
        <div className='setting-content'>
          <Head>通用设置</Head>
          <Inner />
          <div className='setting-del'>删除设备</div>
        </div>
      </MainPage>
    );
  }
}
export default Settings;
