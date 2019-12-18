import React, { Component } from "react";
import MainPage from "../../../comm/MainPage";
import Inner from "./Inner";

class Settings extends Component {
  render() {
    return (
      <MainPage>
        <div className='setting-contents'>
          <Inner />
        </div>
      </MainPage>
    );
  }
}
export default Settings;
