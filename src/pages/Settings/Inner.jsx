import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import { List, Button } from "antd-mobile";
const Item = List.Item;

@inject("deviceStore")
@withRouter
@observer
class Inner extends Component {
  //到编辑设备名称页面
  goEditDeviceName = () => {
    this.props.history.push("/Settings/EditDeviceName");
  };
  //到房间列表页面
  goRoomList = () => {
    this.props.history.push("/Settings/RoomList");
  };
  //到编辑智能面板页面
  goEditSwitchPanel = () => {
    this.props.history.push("/Settings/EditSwitchPanel");
  };
  //到新的连接
  goNewLocation = () => {
    window.location.href =
      "http://smarthome.manage.ott4china.com:7777/smarthome_h5/defaultIndex/defaultGuide.html";
  };
  //显示删除设备模态框
  showDelDeviceModal = () => {
    this.props.history.push("Settings/ModalDelDevice");
  };
  //控制显示设置
  controlDisplay = obj => {
    if (!obj) return;
    if (Object.values(obj).every(val => val === "0")) {
      return " hide";
    }
    return "";
  };
  render() {
    const { deviceName, roomMap, curRoomId } = this.props.deviceStore;
    const showCommon = this.controlDisplay(SETTINGS_CONFIG.common);
    const showFunction = this.controlDisplay(SETTINGS_CONFIG.function);
    const showOther = this.controlDisplay(SETTINGS_CONFIG.other);

    const showDeviceName =
      SETTINGS_CONFIG.common.showDeviceName === "1" ? "" : " hide";
    const showLocation =
      SETTINGS_CONFIG.common.showLocation === "1" ? "" : " hide";
    const showIntelligence =
      SETTINGS_CONFIG.common.showIntelligence === "1" ? "" : " hide";
    const showEditSocket =
      SETTINGS_CONFIG.function.showEditSocket === "1" ? "" : " hide";
    const showFirmwareUpdate =
      SETTINGS_CONFIG.other.showFirmwareUpdate === "1" ? "" : " hide";
    const showUsualProblems =
      SETTINGS_CONFIG.other.showUsualProblems === "1" ? "" : " hide";
    const showSafeInfoNotify =
      SETTINGS_CONFIG.common.showSafeInfoNotify === "1" ? "" : " hide";
    return (
      <div className="inner-setting">
        <div className={`setting-common${showCommon}`}>
          <List renderHeader={() => "通用设置"} className="my-list">
            <Item
              extra={deviceName}
              className={showDeviceName}
              arrow="horizontal"
              onClick={this.goEditDeviceName}
            >
              设备名称
            </Item>
            <Item
              extra={roomMap[curRoomId]}
              className={showLocation}
              arrow="horizontal"
              onClick={this.goRoomList}
            >
              位置管理
            </Item>
            <Item
              className={showIntelligence}
              arrow="horizontal"
              onClick={() => {
                this.props.deviceStore.jumpToIntelligentPage();
              }}
            >
              智能
            </Item>
            {/* <Item
              className={showSafeInfoNotify}
              arrow="horizontal"
              onClick={() => {
                this.props.deviceStore.jumpToSafeInfoNotifyPage();
              }}
            >
              安全宝
            </Item> */}
          </List>
        </div>
        <div className={`setting-function${showFunction}`}>
          <List renderHeader={() => "功能设置"} className="my-list">
            <Item
              className={showEditSocket}
              arrow="horizontal"
              onClick={this.goEditSwitchPanel}
            >
              编辑智能开关
            </Item>
          </List>
        </div>
        <div className={`setting-other${showOther}`}>
          <List renderHeader={() => "其他设置"} className="my-list">
            <Item
              className={showFirmwareUpdate}
              extra="已为最新版本"
              arrow="horizontal"
              onClick={() => {}}
            >
              检查固件升级
            </Item>
            <Item
              className={showUsualProblems}
              arrow="horizontal"
              onClick={this.goNewLocation}
            >
              常见问题
            </Item>
          </List>
        </div>
        <Button className="delDevice" onClick={this.showDelDeviceModal}>
          删除设备
        </Button>
      </div>
    );
  }
}
export default Inner;
