import React, { Component } from "react";
import MainPage from "../../../comm/MainPage";
import Head from "../Head";
import Inner from "./Inner";

class Settings extends Component {
  render() {
    return (
      <MainPage>
        <Head>所属房间</Head>
        <Inner />
      </MainPage>
    );
  }
}
export default Settings;
