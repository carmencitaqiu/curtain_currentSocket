import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router";
import DateDialog from "./DateDialog";

import "./style.less";

@inject("deviceStore", "timeStore")
@withRouter
@observer
class Countdown extends Component {
  /* 点击开始按钮 */
  actionClick = () => {
    this.props.timeStore.addCountDown();
  };
  /* 选择时间 */
  timeSelect = date => {
    const { timeStore } = this.props;
    let { countDownAddInfo } = timeStore;
    countDownAddInfo.hh = date.getHours();
    countDownAddInfo.mm = date.getMinutes();
  };
  render() {
    const { deviceStore, timeStore } = this.props;
    const { countDownAddInfo } = timeStore;

    // 如果没有倒计时信息，则倒计时未启动
    const isTimerStart = !!deviceStore.countDownList;
    const { id = "", name = "", hh = 0, mm = 0, power = "1" } = isTimerStart
      ? deviceStore.countDownList
      : countDownAddInfo;
    const _hh = hh < 10 ? "0" + hh : hh;
    const _mm = mm < 10 ? "0" + mm : mm;
    // 显示开始or取消
    const setAction = isTimerStart ? "取消" : "开始";
    return (
      <div className="container">
        <div className="count-down">
          <div className="title-box">倒计时</div>
          <div className="down-content">
            {!isTimerStart?(
            <DateDialog hh={hh} mm={mm} callback={this.timeSelect}>
              <div className="time-data">
                {_hh}:{_mm}
              </div>
            </DateDialog>
            ):(
              <div className="time-data">
                {_hh}:{_mm}
              </div>
            )}
            <div className="count-tips">倒计时结束后开启设备</div>
          </div>
          <div className="action" onClick={this.actionClick}>
            {setAction}
          </div>
        </div>
      </div>
    );
  }
}

export default Countdown;
