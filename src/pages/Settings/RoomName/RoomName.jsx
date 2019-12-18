import React, { Component } from "react";
import MainPage from "../../../comm/MainPage";
import Head from "../Head";
import Inner from "./Inner";

class Settings extends Component {
  render() {
    return (
      <MainPage>
        <div className='setting-box'>
          <div className='setting-top-txt'>设备名称</div>
          <Inner />
          <div className='setting-txt'>设备名称已简化,便于显示和语言操作</div>
        </div>
      </MainPage>
    );
  }
}
export default Settings;
