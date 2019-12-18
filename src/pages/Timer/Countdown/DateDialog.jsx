import React, { Component } from "react";
import { DatePicker } from "antd-mobile";

class DateDialog extends Component {
  constructor(props) {
    super(props);
    const { hh, mm } = props;
    this.state = {
      time: new Date(new Date().setHours(hh, mm))
    };
  }

  onChange = time => {
    this.setState({ time });
  };
  onOk = time => {
    this.props.callback(time);
    this.setState({ time: null });
  };

  componentDidUpdate() {
    if (this.state.time === null) {
      const { hh, mm } = this.props;
      this.setState({
        time: new Date(new Date().setHours(hh, mm))
      });
    }
  }

  render() {
    const { time } = this.state;
    return (
      <DatePicker
        mode="time"
        title="设置"
        value={time}
        onChange={this.onChange}
        onOk={this.onOk}
      >
        {this.props.children}
      </DatePicker>
    );
  }
}
export default DateDialog;
