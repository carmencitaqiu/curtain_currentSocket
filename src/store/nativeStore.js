import dsBridge from "dsbridge";
import BaseStore from "./baseStore/BaseStore";
import deviceStore from "./deviceStore";
import config from "./baseStore/configStore";

const { errorMsg, infoMsg } = config;

class NativeStore extends BaseStore {
  /**
   * @method web调用App方法
   * 对错误返回码进行统一处理，对于小翼管家sdk中无响应的方法不应该传递success和error这两个参数
   * @param {String} method
   * @param {Object} params
   * @param {Function} success
   * @param {Function} error
   */
  callAppMethod(method, params = "", success, error) {
    if (!method) return;

    // NOTE Test
    infoMsg("调用源生方法", method, params);

    params = typeof params === "string" ? params : JSON.stringify(params);

    // NOTE Test
    infoMsg(params);

    if (typeof success === "function") {
      dsBridge.call(method, params, res => {
        res = typeof res === "string" ? JSON.parse(res) : res;

        // NOTE Test
        infoMsg("调用源生方法返回结果", method, res);
        try {
          infoMsg(JSON.stringify(res));
        } catch (e) {}

        const { sequenceNo } = res;
        if (parseInt(res.error_code) === 0) {
          if (res.parameter) {
            typeof success === "function" &&
              success(Object.assign(res.parameter, { sequenceNo }));
          } else {
            typeof success === "function" && success({ sequenceNo });
          }
        } else {
          typeof error === "function" && error({ sequenceNo });
          dsBridge.call("jsToastString", res.error_msg);
        }
      });
      return;
    }
    dsBridge.call(method, params);
  }

  /**
   * @method 注册web方法供App调用
   * @param {String} method
   * @param {Function} callback
   */
  registerWebMethod(method, callback = () => {}) {
    if (!method) return;
    dsBridge.register(method, params => {
      params = typeof params === "string" ? JSON.parse(params) : params;

      //记录源生调用JS的每次过程
      // NOTE Test
      infoMsg("源生调用JS方法返回结果", method, params);
      try {
        infoMsg(JSON.stringify(params));
      } catch (e) {}

      typeof callback === "function" && callback(params);
    });
  }

  /**
   * @method 源生与JS交互初始化
   * 注册源生调用webview方法
   * 注册源生派发 设备收到状态变更消息
   * 注册源生派发 设备修改名称
   */
  init() {
    //注册导航Webview响应
    this.registerWebMethod("navigateWebView", data => {
      const { type } = data;
      if (type === "left") {
        window.history.back();
      } else if (type === "right") {
        //history.forward();
      } else if (type === "middle") {
        deviceStore.closeWebView();
      }
    });

    //设备收到状态变更消息

    // TODO 检查状态信息返回数据结果，并截图

    this.registerWebMethod("deviceStatusChange", rst => {
      const { error_code, parameter } = rst;
      // eslint-disable-next-line eqeqeq
      if (error_code == 0) {
        //如果成功
        deviceStore.setDeviceStatus(parameter);
      }
    });

    //设备修改名称
    this.registerWebMethod("deviceNameChange", rst => {
      errorMsg("~~~", "触发了设备修改名称", rst);
      //deviceStore.setDeviceName(rst.deviceName);
    });

    this.initDevice(); //初始化设备信息
  }
  /**
   * @method 初始化设备信息
   */
  initDevice() {
    deviceStore.init();
  }
}
const nativeStore = new NativeStore();
export default nativeStore;
