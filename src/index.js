import React from "react";
import ReactDOM from "react-dom";
import MainRouter from "./containers/MainRouter";

import config from "./store/baseStore/configStore";
import nativeStore from "./store/nativeStore";
import mockDataStore from "./store/mockDataStore";

import "./static/css/index.less";
import "./static/css/add.less";

/**
 * @method 屏幕适配，主要通过控制根节点字号大小来设置当前rem基准值
 */
function resizefn() {
  const html = document.documentElement;
  const w = Math.min(html.clientWidth, html.clientHeight);
  html.style.fontSize = Math.max(w, 320) / 10 + "px";
}
//添加屏幕旋转事件
if ("onorientationchange" in window) {
  window.addEventListener("orientationchange", resizefn, false);
} else {
  window.addEventListener("resize", resizefn, false);
}
resizefn();

nativeStore.init(); // 源生与JS交互初始化
ReactDOM.render(<MainRouter />, document.getElementById("root"));

// 模拟移动端控制台，只要在调试模式时才执行该操作


setTimeout(() => {
  // NOTE 如果是调试模式，则加载可视化控制台组件
  if (config.debug) {
    eruda.init();
    // 模拟数据初始化
    mockDataStore.init();
  }
}, 0);
