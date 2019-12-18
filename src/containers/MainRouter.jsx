import React, { Component } from "react";
import { Provider } from "mobx-react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import App from "./App";

/* 页面路由地址引入 start */
import Home from "../pages/Home";

import Settings from "../pages/Settings";
import RoomList from "../pages/Settings/RoomList/RoomList";
import RoomName from "../pages/Settings/RoomName/RoomName";
import RoomChecked from "../pages/Settings/RoomChecked/RoomChecked";

// 定时路由
import Timing from "../pages/Timing/Timing";
import Adding from "../pages/Timing/Adding/Adding";
import Repeat from "../pages/Timing/Adding/RepeatComm/home";
import Custom from "../pages/Timing/Custom/custom";

/* 倒计时路由 */
import Countdown from "../pages/Timer/Countdown";

/* 电量路由 */
import ElectricPower from "../pages/Timer/ElectricPower";
/* 页面路由地址引入 end */

/* 状态集导入 */
import store from "../store";

export default class MainRouter extends Component {
  render() {
    return (
      <HashRouter basename="">
        <Provider {...store}>
          <div id="root-inner">
            <App />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Home" component={Home} />
              <Route exact path="/Home/PowerOff" component={Home} />

              {/*定时路由*/}
              <Route exact path="/Timing/Timing" component={Timing}/>
              {/*定时增加路由*/}
              <Route exact path="/Timing/Adding" component={Adding}/>
              {/*定时重复页面增加路由*/}
              <Route exact path="/Timing/Repeat" component={Repeat}/>
              {/*定时页面自定义路由*/}
              <Route exact path="/Timing/Custom" component={Custom}/>

              {/* 倒计时路由 */}
              <Route exact path="/Timer/Countdown" component={Countdown} />
              {/* 电量路由 */}
              <Route
                exact
                path="/Timer/ElectricPower"
                component={ElectricPower}
              />

              <Route exact path="/Settings" component={Settings} />
              <Route exact path="/Settings/DeviceName" component={Settings} />
              <Route exact path="/Settings/RoomList" component={RoomList} />
              <Route exact path="/Settings/RoomName" component={RoomName} />
              <Route exact path="/Settings/RoomChecked" component={RoomChecked} />

              {/* <Route exact path="/404" component={NotFound} /> */}
              {/* <Redirect to="/404" /> */}
            </Switch>
          </div>
        </Provider>
      </HashRouter>
    );
  }
}
