import React, { Component } from "react";
import { DatePicker, List } from "antd-mobile";


function formatDate(date) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => (n < 10 ? `0${n}` : n);
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
  return `${dateStr}`;
}
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
class DateModel extends Component {
  state = {
    date: now,
    dpDate: now
  };
  render() {
    return (
      <DatePicker
        mode="month"
        format={val => `${formatDate(val)}`}
        value={this.state.dpDate}
        onChange={date => this.setState({ dpDate: date })}
      >
        <List.Item arrow="horizontal"></List.Item>
      </DatePicker>
    );
  }
}
export default DateModel;
