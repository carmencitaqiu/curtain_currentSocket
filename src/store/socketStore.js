import BaseStore from "./baseStore/BaseStore";
import deviceStore from "./deviceStore";

class SocketStore extends BaseStore {
  /**
   * @method 控制当前线路开关
   */
  controlTime = false; // 节流参数
  togglePower() {
    // NOTE 无效操作
    if (deviceStore.deviceChangeed === 0) {
      deviceStore.toastString("请等待连接设备");
      return;
    }
    // NOTE 节流操作
    if (this.controlTime) {
      deviceStore.toastString("请勿重复操作");
      return;
    }
    this.controlTime = true;

    const { deviceId, statusMap, curSerialId } = deviceStore;
    // NOTE 执行设备控制具体的操作

    deviceStore.controlDevice({
      deviceId,
      serialId: curSerialId,
      actionCmdSerial: [
        {
          cmdName: "SET_POWER",
          cmdParam: statusMap[curSerialId]["POWER"] === "1" ? "0" : "1"
        }
      ]
    });

    setTimeout(() => {
      this.controlTime = false;
    }, 2000);
  }
}
const socketStore = new SocketStore();
export default socketStore;
