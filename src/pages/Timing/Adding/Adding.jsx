import React, { Component } from "react";
import { inject } from "mobx-react";
import { withRouter } from "react-router";
import MainPage from "../../../comm/MainPage";
import DatePicker from  "../Adding/DatePicker";
import Radio from  "../Adding/Radio";
import Repeat from "../Adding/Repeat";


import "./style.less";


@inject("deviceStore","hangerStore")
@withRouter
class Adding extends Component {

  onOk(){
    this.props.history.push("/Timing/Timing");
  }

  render() {
    return (
      <MainPage>
        <div className='adding-content'>
          <div className='adding-top'>
            <div className='adding-title'>自定义</div>
            <div className='add' onClick={e => this.onOk()}>保存</div>
          </div>
          <DatePicker/>
          <Radio/>
          <Repeat/>

        </div>
      </MainPage>
    );
  }
}
export default Adding;
