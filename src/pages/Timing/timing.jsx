import React, { Component } from "react";
import { inject } from "mobx-react";
import { withRouter } from "react-router";
import {Link} from 'react-router-dom';
import MainPage from "../../comm/MainPage";
import TimingList from  "./Timing/TimingList";

import "./style.less";


@inject("deviceStore","hangerStore")
@withRouter
class Timing extends Component {

  render() {
    return (
      <MainPage>
        <div className='Timing-content'>
          <div className='timing-top'>
            <div className='timing-title'>定时</div>
            <Link to="/Timing/Adding">
              <div className='add'></div>
            </Link>
          </div>

          <TimingList/>

        </div>
      </MainPage>
    );
  }
}
export default Timing;
