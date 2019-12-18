import BaseStore from "./baseStore/BaseStore";
import deviceStore from "./deviceStore";
import { observable } from "mobx";
// import config from "./baseStore/configStore";

// const { errorMsg, infoMsg } = config;

/**
 * @class GatewayStore
 * @extends {BaseStore}
 * @note [专属于本设备的操作，通过调用deviceStore中的方法]
 */
class GatewayStore extends BaseStore {
  @observable haveChoose = true ; //有无选择
  @observable choosePower = true ;  //选择电源  true = 电源  false = USB
  @observable TimingList = []; //定时列表
  @observable isShowPowerOff = false; //是否显示电源开启弹窗
  /**
   * @method 显示电源开启弹窗
   */
  showPowerOff() {
    this.setState({ isShowPowerOff: !!1 });
  }
  /**
   * @method 关闭电源开启弹窗
   */
  hidePowerOff() {
    this.setState({ isShowPowerOff: !!0 });
  }

  /**
   * @method 控制当前线路电源开关
   */
  OpenWithClose() {
    const { deviceId, curSerialId, statusMap } = deviceStore;
    if (statusMap[curSerialId]) {
      deviceStore.controlDevice({
        deviceId,
        serialId: curSerialId,
        actionCmdSerial: [
          {
            cmdName: "SET_POWER",
            cmdParam: statusMap[curSerialId]["POWER"] === "0" ? "1" : "0"
          }
        ]
      });
    }
  }

  /**
   * @method 跳转到网关关联的产商添加设备列表页（源生页）
   */
  goSubDevList() {
    deviceStore.goSubDevList();
  }
}
const gatewayStore = new GatewayStore();
export default gatewayStore;
