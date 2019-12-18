import React, { Component } from "react";
import { inject } from "mobx-react";
import { withRouter } from "react-router";
import MainPage from "../../../comm/MainPage";
import "./style.less";

const CustomList =[
  {
    value:0,
    name:'周日'
  },
  {
    value:1,
    name:'周一'
  },
  {
    value:2,
    name:'周二'
  },
  {
    value:3,
    name:'周三'
  },
  {
    value:4,
    name:'周四'
  },
  {
    value:5,
    name:'周五'
  },
  {
    value:6,
    name:'周六'
  }
];

@inject("deviceStore","hangerStore")
@withRouter
class Custom extends Component {

  state = {
    CustomStateList : [false,false,false,false,false,false,false]
  };

  onChange(index){
    const  custom = this.state.CustomStateList;
    custom.splice(index,1,this.state.CustomStateList[index] === false ? true : false);
    this.setState({
      CustomStateList : custom
    });
  }

  CustomAddOk(){
    this.props.hangerStore.CustomStateList([this.state.CustomStateList]);
    this.props.hangerStore.CustomShowChoose();
    this.props.history.push("/Timing/Repeat");
  }

  render() {
    return (
      <MainPage>
        <div className='custom'>
          <div className='custom-top'>
            <div className='custom-title'>自定义</div>
            <div className='add' onClick={ e => this.CustomAddOk()}>保存</div>
          </div>

          <div className='Custom'>
            {
              CustomList.map((item,index)=>{
                return (
                  <div className='Custom-content' key={index}>
                    <label className='Custom-label'>{item.name}</label>
                    <input type="checkbox"  className='Custom-input' onChange={ e => this.onChange(index)}/>
                    <i className="more"></i>
                  </div>
                );
              })
            }
          </div>
        </div>

      </MainPage>
    );
  }
}
export default Custom;
