import React, { Component } from "react";
import { withRouter } from "react-router";
import { Modal } from "antd-mobile";
import { inject, observer } from "mobx-react";

@inject("deviceStore")
@withRouter
@observer
class ModalDelDevice extends Component {
  //关闭模态框
  onClose = () => {
    this.props.history.goBack();
  };
  //关闭弹窗后的回调
  afterClose = () => {
    // console.log("关闭");
  };
  //确定删除设备
  delDevice = () => {
    const { deviceStore, history } = this.props;
    const { deviceId } = deviceStore;
    deviceStore.unbindDevice(deviceId);
  };
  render() {
    const { isShowDelDeviceModal } = this.props.deviceStore;
    return (
      <Modal
        visible={isShowDelDeviceModal}
        transparent
        onClose={this.onClose}
        afterClose={this.afterClose}
        className="del-modal"
      >
        <div className="wrap">
          <div className="top">
            <div className="tips">提示</div>
            <div className="content">是否删除该设备？</div>
          </div>
          <div className="bottom">
            <div className="button cancel" onClick={this.onClose}>
              取消
            </div>
            <div className="button confirm" onClick={this.delDevice}>
              确定
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
export default ModalDelDevice;
