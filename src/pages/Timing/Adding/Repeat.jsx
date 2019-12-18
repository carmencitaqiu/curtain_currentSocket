import React, { Component } from "react";
import { inject } from "mobx-react";
import { withRouter } from "react-router";
import { List } from "antd-mobile";
import {Link} from 'react-router-dom';
import "./style.less";

const Item = List.Item;
@inject("deviceStore","hangerStore")
@withRouter

class Repeat extends Component {
  state= {
    RepeatName : '请选择'
  };

  componentDidMount() {
    const { hangerStore } = this.props;
    const { CustomState , CustomList, RepeatTime}  = hangerStore;

    if(!CustomState){
      if(RepeatTime === '0'){
        this.setState({
          RepeatName:'仅一次'
        });
      }else if(RepeatTime === '1'){
        this.setState({
          RepeatName:'每天'
        });
      }else if(RepeatTime === '2'){
        this.setState({
          RepeatName:'周一至周五'
        });
      }
    }else {
      this.setState({
        RepeatName: CustomList.map((item,index)=>{
                      if(index === 0 && item === true){
                        return ('周末 ');
                      }else if(index === 1 && item === true){
                        return ('周一 ');
                      }else if(index === 2 && item === true){
                        return ('周二 ');
                      }else if(index === 3 && item === true){
                        return ('周三 ');
                      }else if(index === 4 && item === true){
                        return ('周四 ');
                      }else if(index === 5 && item === true){
                        return ('周五 ');
                      }else if(index === 6 && item === true){
                        return ('周六');
                      }
                    })
      });
    }
  }

  render() {
    const { RepeatName } = this.state;
    return (
     <div className='repeat-list'>
       <Link to="/Timing/Repeat">
         <List>
           <Item
             arrow="horizontal"
             extra={
               RepeatName
             }
           >重复</Item>
         </List>
       </Link>
     </div>
    );
  }
}
export default Repeat;
