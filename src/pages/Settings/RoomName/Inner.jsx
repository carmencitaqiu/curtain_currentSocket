import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";

@inject("deviceStore")
@withRouter
@observer
class Inner extends Component {
  state = {
    nowName: null
  };

  checkVal = e => {
    const v = e.target.value.replace(/^\s+|\s+$/g, "");
    this.setState({
      nowName: v
    });
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

  render() {
    const { nowName } = this.state;
    const { name } = this.props.deviceStore;
    return (
      <div className='setting-name'>
        <input
          // type="text"
          placeholder="请输入设备名称"
          maxLength={20}
          onChange={this.checkVal}
          value={nowName === null ? name : nowName}
          className='setting-input'/>

          <div className='setting-ok'>
            <div onClick={this.ok}>
              保存
            </div>
          </div>
      </div>
    );
  }
}
export default Inner;
