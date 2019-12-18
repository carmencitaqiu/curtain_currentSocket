import React, { Component } from "react";
import MainPage from "../../../comm/MainPage";
import Head from "../Head";
import Inner from "./Inner";

class Settings extends Component {
  render() {
    return (
      <MainPage>
        <div className='setting-box'>
          <Inner />
        </div>
      </MainPage>
    );
  }
}
export default Settings;
