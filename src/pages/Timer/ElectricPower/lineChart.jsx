import React, { Component } from "react";
import { withRouter } from "react-router";
import { observer, inject } from "mobx-react";

@withRouter
@observer
class LineChart extends Component {
  initCharts() {
    const { id } = this.props;
    const containers = document.getElementById(id);
    const option = {
      title: {
        text: "度",
        textStyle: {
          fontSize: 12,
          color: "#9BA3B0",
          fontWeight: 400
        },
        y: 30,
        x: 10
      },
      xAxis: [
        {
          type: "category",
          data: ["1", "5", "10", "15", "20", "25", "30"],
          axisLine: {
            lineStyle: {
              color: "#9ba3b0"
            }
          },
          axisTick: {
            //刻度线
            show: false //去掉刻度线
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          splitNumber: 4,
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#9BA3B0"
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#9BA3B0"
            }
          },
          nameTextStyle: {
            color: "#9BA3B0",
            align: "left", //文字水平对齐方式
            verticalAlign: "middle" //文字垂直对齐方式
          },
          splitArea: {
            show: false
          }
        }
      ],
      series: [
        {
          type: "line",
          data: [2, 58, 10, 100, 63, 58, 65],
          symbolSize: 3,
          label: {
            normal: {
              formatter: "{@data}度",
              show: true,
              color: "#548EFF"
            }
          },
          lineStyle: {
            color: {
              type: "linear",
              colorStops: [
                {
                  offset: 0,
                  color: "#76c9fc" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#548EFF" // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            }
          },
          itemStyle: {
            normal: {
              color: "#fff",
              borderWidth: 5,
              borderColor: "#548EFF"
            }
          }
        }
      ]
    };
    const chart = echarts.init(containers);
    chart.setOption(option, true);
  }
  componentDidMount() {
    this.initCharts();
  }
  componentDidUpdate() {
    this.initCharts();
  }
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
export default LineChart;
