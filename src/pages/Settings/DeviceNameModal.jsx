import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import { Modal } from "antd-mobile";

@inject("deviceStore")
@withRouter
@observer
class DeviceNameModal extends Component {
  state = {
    nowName: null
  };
  onClose = () => {
    this.props.history.goBack();
  };
  ok = () => {
    const { deviceStore, history } = this.props;
    const { nowName } = this.state;
    const { name } = deviceStore;
    const v = nowName || name;
    if (nowName === "") {
      deviceStore.toastString("请输入设备名称");
    } else {
      history.goBack();
      deviceStore.setDeviceName(v);
    }
  };
  checkVal = e => {
    const v = e.target.value.replace(/^\s+|\s+$/g, "");
    this.setState({
      nowName: v
    });
  };

  componentDidUpdate() {
    if (
      !this.props.deviceStore.isShowDeviceName &&
      this.state.nowName !== null
    ) {
      this.setState({ nowName: null });
    }
  }

  render() {
    const { nowName } = this.state;
    const { isShowDeviceName, name } = this.props.deviceStore;
    return (
      <Modal
        visible={isShowDeviceName}
        transparent={true}
        onClose={this.onClose}
        wrapClassName="DN-model"
      >
        <div className="Modal">
          <div className="Modal-input">
            <div className="Modal-input-tit">自定义设备名称</div>
            <div className="Modal-input-wrap">
              <input
                type="text"
                placeholder="请输入设备名称"
                maxLength={20}
                value={nowName === null ? name : nowName}
                onChange={this.checkVal}
              />
            </div>
          </div>
          <div className="Modal-bottom">
            <div className="Modal-btn" onClick={this.onClose}>
              取消
            </div>
            <div className="Modal-btn" onClick={this.ok}>
              确认
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
export default DeviceNameModal;
