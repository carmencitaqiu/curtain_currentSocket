import React, { Component } from "react";
import { inject } from "mobx-react";
import { withRouter } from "react-router";
import "./style.less";
@inject("deviceStore","hangerStore")
@withRouter

class Radio extends Component {
  onChange(value){
    this.props.hangerStore.ComplyRadioState(value);
  }

  render() {
    return (
      <div className="radio-box">
        <div className='radio-title'>执行</div>
        <label><input type="radio" name="radio" value='0' onChange={e =>this.onChange(0)}/><i className="spot"></i><span>开启</span></label>
        <label><input type="radio" name="radio" value='1' onChange={e =>this.onChange(1)}/><i className="spot"></i><span>关闭</span></label>
      </div>
    );
  }
}
export default Radio;
