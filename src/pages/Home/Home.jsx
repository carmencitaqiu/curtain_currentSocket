import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import MainPage from "../../comm/MainPage";
import Bottom from "./Bottom";
import List from  "./List";
import Power from  "./Power";

import ModalPowerOff from "./ModalPowerOff";

import "./style.less";

@inject("gatewayStore", "deviceStore")
@withRouter
@observer
class Home extends Component {
  check() {
    const { history, gatewayStore } = this.props;
    // NOTE 如果是需要弹出弹出框展示信息时
    if (history.location.pathname === "/Home/PowerOff") {
      gatewayStore.showPowerOff();
    } else {
      gatewayStore.hidePowerOff();
    }
  }
  componentDidMount() {
    this.check();
  }
  componentDidUpdate() {
    this.check();
  }

  // 检查设备是否启动
  checkPower = () => {
    const { deviceStore, history } = this.props;
    let {touch} = this.props;    
    const { POWER } = deviceStore.currentStatus || {};
    if (POWER === "1") return true;
    else if (POWER === undefined) {
      deviceStore.toastString("请等待获取设备详情");
      return false;
    } else {
      history.push("/Home/PowerOff"); // 跳转到是否开启电源开关
      return false;
    }
  };

  curtainTouchStart = (e) => {
    e.preventDefault();
    console.log('touchstart');
    this.props.touch.initiated = true;
    this.props.touch.startX = e.touches[0].pageX;

  }
  curtainTouchMove = (e) => {
    e.preventDefault();
    console.log('touchmove');
  }

  curtainTouchEnd = (e) => {
    e.preventDefault();
    console.log("touchend");
  }

  render() {
    const { gatewayStore } = this.props;
    const { choosePower = true , haveChoose = false} = gatewayStore;

    const { deviceStore } = this.props;
    const { POWER = '0' } = deviceStore.currentStatus || {};

    return (
      <MainPage>
        <div className={"box-header" + (POWER === '0' ? '' : ' open')}>
          <div className="name">窗帘</div>
          <div className="curtain-block">
            <div className="curtain-header"></div>
            <div className="curtain-body">
             <div className="curtain-left"></div>
             <div className="curtain-right"></div>
             <div className="curtain-btn" ref="curtainBtn" 
             onTouchStart={this.curtainTouchStart} 
             onTouchMove={this.curtainTouchMove} 
             onTouchEnd={this.curtainTouchEnd}></div>
            </div>
          </div>
        </div>

        {/* <Power /> */}

        <List/>

         <Bottom />

        <ModalPowerOff />
      </MainPage>
    );
  }
}
export default Home;
