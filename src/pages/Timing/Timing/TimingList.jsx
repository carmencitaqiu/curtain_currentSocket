import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import { SwipeAction , Switch } from 'antd-mobile';


import "./style.less";


@inject("gatewayStore",'hangerStore')
@withRouter
@observer
class TimingList extends Component {

  componentDidMount() {
    const { hangerStore } = this.props;
    const {TimingList, TimingTime, ComplyState , CustomList , CustomState , RepeatTime } = hangerStore;
    TimingList.push({TimingTime, ComplyState , CustomList , CustomState , RepeatTime});
    console.error(TimingList,TimingList.length);
  }

  render() {
    const { hangerStore } = this.props;
    const { TimingList } = hangerStore;
    return (
      <div className='timing-box'>
        {
          TimingList.length > 0 ?
            <div>
              <SwipeAction
                style={{ backgroundColor: 'gray' }}
                autoClose
                right={[
                  {
                    text: '删除',
                    style: { backgroundColor: '#F4333C', color: 'white',fontSize:'15px' , padding:'0 10px'},
                  },
                ]}
              >
                <div className='timing-list'>
                  <div className='list-text'>
                    <div className='list-time'>
                      上午
                      <span>11:00</span>
                    </div>
                    <div className='list-custom'>
                      <span>关闭</span>
                      <span>每周一，周二执行</span>
                    </div>
                  </div>
                  <Switch
                    checked={false}
                    onChange={() => {}}
                  />
                </div>
              </SwipeAction>
            </div>
            :
            <div className='timing-img-box'>
              <div className='timing-img'></div>
              <div className='timing-text'>你还没有设置定时数据</div>
            </div>
        }
      </div>
    );
  }
}
export default TimingList;