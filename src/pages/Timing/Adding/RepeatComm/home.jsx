import React, { Component } from "react";
import { inject } from "mobx-react";
import { withRouter } from "react-router";
import MainPage from "../../../../comm/MainPage";
import {Link} from 'react-router-dom';

import "./home.less";

const RadioList = [
  {
    value:0,
    name:'仅一次'
  },
  {
    value:1,
    name:'每天'
  },
  {
    value:2,
    name:'周一至周五'
  }
];

@inject("deviceStore","hangerStore")
@withRouter
class Home extends Component {
  state = {
    ChooseCustom : false
  };

  CheckboxChange(e){
    this.setState({
      ChooseCustom : false
    });
    this.props.hangerStore.RepeatChangeTime(e.target.value);
    this.props.hangerStore.CustomHideChoose();
  }

  onOk(){
    this.props.history.push("/Timing/Adding");
  }

  render() {
    const { hangerStore } = this.props;
    const { CustomList , CustomState } = hangerStore;
    return (
      <MainPage>
        <div className='repeat-content'>
          <div className='repeat-top'>
            <div className='repeat-title'>添加定时</div>
            <div className='add' onClick={e => this.onOk()}>保存</div>
          </div>

          <div className="checkbox-box">
            {
              RadioList.map((item,index)=>{
                return (
                  <div key={index}>
                    <label className='checkbox-label'>{item.name}</label>
                    <input type="radio" name="radio" value={item.value} className='checkbox-input' onChange={e => this.CheckboxChange(e)}/>
                    <i className="spot"></i>
                  </div>
                );
              })
            }
          </div>

          <Link to="/Timing/Custom" style={{color:'black'}}>
            <div className='custom-box'>
              <label className='custom-label'>自定义</label>
              <input type="radio"  className='custom-input'/>
              {
                CustomState ?
                  <i className="checked"></i>
                  :
                  <i className="more"></i>

              }
            </div>
          </Link>

          <div className='custom-span' style={{display: CustomState?"block":"none"}}>
            <span>每</span>
            {
              CustomList.map((item,index)=>{
                if(index === 0 && item === true){
                  return (<span key={index}>周末 </span>);
                }else if(index === 1 && item === true){
                  return (<span key={index}>周一 </span>);
                }else if(index === 2 && item === true){
                  return (<span key={index}>周二 </span>);
                }else if(index === 3 && item === true){
                  return (<span key={index}>周三 </span>);
                }else if(index === 4 && item === true){
                  return (<span key={index}>周四 </span>);
                }else if(index === 5 && item === true){
                  return (<span key={index}>周五 </span>);
                }else if(index === 6 && item === true){
                  return (<span key={index}>周六</span>);
                }
              })
            }
            <span>重复</span>
          </div>
        </div>
      </MainPage>
    );
  }
}
export default Home;
