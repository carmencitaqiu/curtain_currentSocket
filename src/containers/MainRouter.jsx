import React, { Component } from "react";
import { Provider } from "mobx-react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import App from "./App";

/* 页面路由地址引入 start */
import Home from "../pages/Home";
// import LogList from "../pages/LogList";

import Settings from "../pages/Settings";
import EditDeviceName from "../pages/Settings/EditDeviceName";
import RoomList from "../pages/Settings/RoomList";
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
              {/* <Route exact path="/LogList" component={LogList} /> */}
              <Route exact path="/Home/DelDevice" component={Home} />
              <Route exact path="/Settings" component={Settings} />
              <Route
                exact
                path="/Settings/EditDeviceName"
                component={EditDeviceName}
              />
              <Route
                exact
                path="/Settings/ModalDelDevice"
                component={Settings}
              />
              <Route exact path="/Settings/RoomList" component={RoomList} />

              {/* <Route exact path="/404" component={NotFound} /> */}
              {/* <Redirect to="/404" /> */}
            </Switch>
          </div>
        </Provider>
      </HashRouter>
    );
  }
}
