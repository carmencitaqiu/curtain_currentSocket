/**
 * @name stores [状态集列表]
 */

import deviceStore from "./deviceStore";
import nativeStore from "./nativeStore";

import gatewayStore from "./gatewayStore";
import timeStore from "./timeStore";
import socketStore from "./socketStore";

import hangerStore from "./hangerStore";

import curtainStore from "./curtainStore";

import conifg from "./baseStore/configStore";
import mockDataStore from "./mockDataStore";

let store = {
  deviceStore,
  nativeStore,
  gatewayStore,
  timeStore,
  socketStore,
  curtainStore,
  hangerStore
};
if (conifg.debug) {
  store.mockDataStore = mockDataStore; // 添加调试模拟数据
  window.store = store;
}

export default store;