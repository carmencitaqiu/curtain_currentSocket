import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import MainPage from "../../comm/MainPage";
import Bottom from "./Bottom";
import List from  "./List";
import Power from  "./Power";

import ModalPowerOff from "./ModalPowerOff";

import "./style.less";
import Curtain from "./Curtain";

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

  onRef=(ref)=>{
    this.curtain=ref;
  }


  render() {
    const { gatewayStore } = this.props;
    const { choosePower = true , haveChoose = false} = gatewayStore;

    const { deviceStore } = this.props;
    const { POWER = '0' } = deviceStore.currentStatus || {};
    const { deviceOnLine } = deviceStore;

    return (
      <MainPage>
        <div className={"box-header" + (deviceOnLine === '1' ? ' open' : '')}>
          <div className="name">窗帘</div>
          <Curtain ref="curtain" onRef={this.onRef}/>
        </div>
        <List 
        openCurtain = {
          () => {
            this.curtain.openCurtain && this.curtain.openCurtain()
          }
        }
        closeCurtain = {
          () => {
            this.curtain.closeCurtain && this.curtain.closeCurtain()
          }
        }

        suspend = {
          () => {
            this.curtain.suspend && this.curtain.suspend()
          }
        }
        />
        <Bottom />
        <ModalPowerOff />
      </MainPage>
    );
  }
}
export default Home;
