import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";

@inject("gatewayStore","deviceStore")
@withRouter
@observer

class Power extends Component {

  SetPower = () =>{
    const { deviceStore } = this.props;
    const { POWER = '0' } = deviceStore.currentStatus || {};
    this.props.gatewayStore.OpenWithClose(POWER === '0' ? '1' : '0');
  };

  render() {
    const { deviceStore } = this.props;
    const { POWER = '0' } = deviceStore.currentStatus || {};
    return (
      <div className={"Power" + ( POWER === '0' ? '' : ' open')} onClick={this.SetPower}>

      </div>
    );
  }
}
export default Power;