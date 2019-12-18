import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";

import { List, Switch } from 'antd-mobile';


@inject("deviceStore")
@withRouter
@observer
class Inner extends Component {
  state = {
    checked: false,
    checked1: true,
  };
  render() {
    return (
      <List
      >
        <List.Item
          extra={<Switch
            checked={this.state.checked}
            color="#3e9fff"
            onChange={() => {
              this.setState({
                checked: !this.state.checked,
              });
            }}
          />}
        >
          <div className='checked-title'>打开红外传感器</div>
          <div className='checked-prompt'>当门窗传感器打开时，打开红外传感器</div>
        </List.Item>
      </List>
    );
  }
}
export default Inner;
