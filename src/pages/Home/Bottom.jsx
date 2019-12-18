import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";

@inject("gatewayStore")
@withRouter
@observer
class Bottom extends Component {
  goSettings = () => {
    this.props.history.push("/Settings");
  };
  render() {
    return (
      <div className="Bot">
        <div className="Bot-button" onClick={this.goSettings}>
          <i />
          {/*设置*/}
        </div>
      </div>
    );
  }
}
export default Bottom;
