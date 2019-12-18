import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router";

import DateModel from "./Datemodel";
import LineChart from "./lineChart";
import "./style.less";

@withRouter
@observer
class ElectricPower extends Component {
  render() {
    return (
      <div className="container">
        <div className="electric-power">
          <div className="title-box">电量统计</div>
          <div className="content-box">
            <div className="electric-amount">
              <div className="amount">
                <div>今日电量</div>
                <div>
                  4.49<span>度</span>
                </div>
              </div>
              <div className="space"></div>
              <div className="amount">
                <div>总电量</div>
                <div>
                  334.40<span>度</span>
                </div>
              </div>
            </div>
            <div className="electric-detail">
              <div className="current-amount">
                <div>当前电流</div>
                <div>
                  0.55<span>MV</span>
                </div>
              </div>
              <div className="current-amount">
                <div>当前功耗</div>
                <div>
                  7.5<span>W</span>
                </div>
              </div>
              <div className="current-amount">
                <div>当前电压</div>
                <div>
                  220<span>V</span>
                </div>
              </div>
            </div>
          </div>
          <div className="chart-box">
            <div className="charts-box-top">
              <DateModel />
              <div className="use-amount">
                <div>用电量 : </div>
                <div>
                  2332<span>度</span>
                </div>
              </div>
            </div>
            <div className="charts-box-bottom">
              <LineChart id="echarts">
                {/* 上面是添加属性的方式 */}
                <div id="echarts" className="echarts"></div>
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ElectricPower;
