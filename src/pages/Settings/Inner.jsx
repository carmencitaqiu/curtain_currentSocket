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
    window.location.href = "http://smarthome.manage.ott4china.com:7777/smarthome_h5/defaultIndex/defaultGuide.html";
  }
  //显示删除设备模态框
  showDelDeviceModal = () => {
    this.props.history.push("Settings/ModalDelDevice");
  };
  render() {
    const { name, roomMap, curRoomId } = this.props.deviceStore;
    return (
      <div className="inner-setting">
        <div className="setting-common">
          <List renderHeader={() => "通用设置"} className="my-list">
            <Item
              extra={name}
              arrow="horizontal"
              onClick={this.goEditDeviceName}
            >
              设备名称
            </Item>
            <Item
              extra={roomMap[curRoomId]}
              arrow="horizontal"
              onClick={this.goRoomList}
            >
              位置管理
            </Item>
            {/* <Item arrow="horizontal" onClick={() => { }}>
              智能
            </Item> */}
          </List>
        </div>
        {/* <div className="setting-function">
          <List renderHeader={() => "功能设置"} className="my-list">
            <Item arrow="horizontal" onClick={this.goEditSwitchPanel}>
              编辑智能开关
            </Item>
          </List>
        </div> */}
        <div className="setting-other">
          <List renderHeader={() => "其他设置"} className="my-list">
            {/* <Item extra="已为最新版本" arrow="horizontal" onClick={() => { }}>
              检查固件升级
            </Item> */}
            <Item arrow="horizontal" onClick={this.goNewLocation}>
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
