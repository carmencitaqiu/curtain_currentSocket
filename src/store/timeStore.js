import BaseStore from "./baseStore/BaseStore";
import { observable } from "mobx";
import deviceStore from "./deviceStore";

class TimeStore extends BaseStore {
  @observable countDownAddInfo = { hh: 10, mm: 0, power: "0" }; // 没有倒计时信息时添加倒计时的数据

  /* 初始化倒计时参数 */
  initCountDown() {
    this.setState({
      countDownAddInfo: { hh: 10, mm: 0, power: "0" }
    });
  }

  // 添加或停止倒计时
  addCountDown() {
    const isTimerStart = !!deviceStore.countDownList; // 已有倒计时

    if (isTimerStart) {
      deviceStore.deleteCountDown({ id: deviceStore.countDownList.id });
    } else {
      const { countDownAddInfo } = this;
      if (countDownAddInfo.hh + countDownAddInfo.mm === 0) {
        deviceStore.toastString("倒计时不能为零");
        return;
      }
      deviceStore.addCountDown(countDownAddInfo);
    }
  }
}

const timeStore = new TimeStore();
export default timeStore;
