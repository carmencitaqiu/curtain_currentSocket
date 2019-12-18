import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import { Modal } from "antd-mobile";

@inject("gatewayStore")
@withRouter
@observer
class ModalPowerOff extends Component {
  onClose = () => {
    this.props.history.goBack();
  };
  onOk = () => {
    this.onClose();
    this.props.gatewayStore.OpenWithClose("1");
  };
  render() {
    const { isShowPowerOff } = this.props.gatewayStore;
    return (
      <Modal
        popup
        visible={isShowPowerOff}
        onClose={this.onClose}
        animationType="slide-up"
        wrapClassName="DC-model"
      >
        <div className="Modal">
          <div className="Modal-inner">
            <table className="Modal-content">
              <tbody>
                <tr>
                  <td className="Modal-txt">
                    <span>检测到未启动晾衣架，是否立即启动？</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="Modal-bottom">
            <div className="Modal-btn" onClick={this.onClose}>
              取消
            </div>
            <div className="Modal-btn" onClick={this.onOk}>
              启动
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
export default ModalPowerOff;
