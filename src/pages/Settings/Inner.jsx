import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import Head from "./Head";

@inject("deviceStore")
@withRouter
@observer
class Inner extends Component {
  goDeviceName = () => {
    this.props.history.push("/Settings/RoomName");
  };
  goRoomList = () => {
    this.props.history.push("/Settings/RoomList");
  };
  goRoomChecked = () => {
    this.props.history.push("/Settings/RoomChecked");
  };
  render() {
    const { name, roomMap, curRoomId } = this.props.deviceStore;
    return (
      <div>
        <div className="inner">
          <ul className="Setting-list">
            <li className="Setting-list-item" onClick={this.goDeviceName}>
              <span>设备名称</span>
              <span className="Setting-list-right-txt">{name}</span>
              <i className="Setting-list-right" />
            </li>
          </ul>
          <ul className="Setting-list">
            <li className="Setting-list-item" onClick={this.goRoomList}>
              <span>位置管理</span>
              <span className="Setting-list-right-txt">{roomMap[curRoomId]}</span>
              <i className="Setting-list-right" />
            </li>
          </ul>
          {/* <ul className="Setting-list">
            <li className="Setting-list-item" onClick={this.goRoomChecked}>
              <span>智能</span>
              <i className="Setting-list-right" />
            </li>
          </ul> */}
        </div>

        <Head>其他设置</Head>

        <div className="inner">
          {/* <ul className="Setting-list">
            <li className="Setting-list-item">
              <span>检查固件升级</span>
              <span className="Setting-list-right-txt">已为最新版本</span>
              <i className="Setting-list-right" />
            </li>
          </ul> */}
          <ul className="Setting-list">
            <li className="Setting-list-item">
              <span>常见问题</span>
              <i className="Setting-list-right" />
            </li>
          </ul>
        </div>

      </div>

    );
  }
}
export default Inner;
