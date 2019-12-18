import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import {Link} from 'react-router-dom';


@inject("gatewayStore")
@withRouter
@observer
class List extends Component {

  render() {
    return (
      <div className="Controller">

        <Link to="/Timing/Timing">
          <div className={"switch-box"}>
            <i className="timing-img" />
            <span>定时</span>
          </div>
        </Link>


        <Link to="/Timer/Countdown">
          <div className={"switch-box"}>
            <i className="down-img" />
            <span>倒计时</span>
          </div>
        </Link>

        <Link to="/Timer/ElectricPower">
          <div className={"switch-box"}>
            <i className="electric-img" />
            <span>电量统计</span>
          </div>
        </Link>
      </div>
    );
  }
}
export default List;