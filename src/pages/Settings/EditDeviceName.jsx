import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import MainPage from "../../comm/MainPage";
import "./index.less";
import { List, InputItem, Button } from "antd-mobile";
const Item = List.Item;

@inject("deviceStore")
@withRouter
@observer
class EditDeviceName extends Component {
  state = {
    value: "",
    active: ""
  };
  componentDidMount() {
    const { deviceStore } = this.props;
    const { deviceId } = deviceStore;
    deviceStore.getRecommendDevName(deviceId);
    setTimeout(() => {
      const { name } = this.props.deviceStore;
      this.setState({ value: name });
    }, 500);
  }
  //表单change
  onChange = val => {
    this.setState({ value: val });
  };
  //确认,提交表单
  confirm = () => {
    const val = this.state.value;
    const { deviceStore, history } = this.props;
    const bool = deviceStore.checkName(val);
    if (!val) {
      deviceStore.toastString("请输入设备名称");
    } else if (!bool) {
      deviceStore.toastString("只支持中文、英文、数字、_、-、.及()且长度1到15");
      return;
    } else {
      deviceStore.setDeviceName(val);
      history.goBack();
    }
  };
  //设置推荐名称
  setActive = order => {
    const list = this.props.deviceStore.recommendDeviceNameList;
    this.setState({ active: order });
    list.forEach((item, idx) => {
      if (item.order === order) {
        this.setState({ value: item.name });
      }
    });
  };
  //跳转到设置开关名称页面
  goSetName = id => {
    // console.log(id);
    this.props.history.push("/SetName");
  };
  render() {
    const list = this.props.deviceStore.recommendDeviceNameList;
    const items = list.map((item, idx) => (
      <div
        className={`item${item.order === this.state.active ? " active" : ""}`}
        key={item.order}
        onClick={this.setActive.bind(this, item.order)}
      >
        {item.name}
      </div>
    ));
    return (
      <MainPage>
        <div className="top">
          <div className="top-name device-name">
            <div className="title">设备名称</div>
          </div>
        </div>
        <div className="inner device-name-info">
          <div className="wrap devicename">
            <div className="input-name">
              <div className="label">开关名称</div>
              <List>
                <InputItem
                  clear
                  value={this.state.value}
                  placeholder="请输入开关名称"
                  onChange={this.onChange}
                ></InputItem>
              </List>
              <div className="tips">请设置简洁的名称，以便显示和语言操作</div>
            </div>
            <div className={`suggest-name${list.length ? "" : " hide"}`}>
              <div className="title">推荐名称</div>
              <div className="list">{items}</div>
            </div>
            <Button type="primary" className="save-name" onClick={this.confirm}>
              保存
            </Button>
          </div>
        </div>
      </MainPage>
    );
  }
}
export default EditDeviceName;
