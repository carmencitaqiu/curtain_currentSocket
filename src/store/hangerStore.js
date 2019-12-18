import BaseStore from "./baseStore/BaseStore";
import deviceStore from "./deviceStore";
import { observable, action } from "mobx";
class HangerStore extends BaseStore {
  @observable
  isShowChooseAppointmentTime = false; //是否显示弹窗

  @observable TimingList = []; //定时列表
  @observable TimingTime = {};  //选择定时
  @observable ComplyState = -1; // 执行 0 开启 1 关闭
  @observable CustomList = [false,false,false,false,false,false,false];  //自定义重复列表
  @observable CustomState = false; //选择重复自定义的状态
  @observable RepeatTime = -1; //重复时间选择 0 仅一次 1 每天 2周一至周五

  HangerTimeChange(time) {
    this.setState({
      TimingTime : {...time}
    });
  }

  CustomStateList(list){
    this.setState({
      CustomList : list[0].slice(),
      CustomState : true
    });
  }

  @action CustomHideChoose(){
    this.setState({
      CustomState : false
    });
  }

  @action CustomShowChoose(){
    this.setState({
      CustomState : true
    });
  }

  @action ComplyRadioState(value){
    this.setState({
      ComplyState : value
    });
  }



  RepeatChangeTime(e){
    this.setState({
      RepeatTime : e
    });
  }


  showChooseAppointmentTime() {
    this.setState({
      isShowChooseAppointmentTime: true
    });
  }
  hideChooseAppointmentTime() {
    this.setState({
      isShowChooseAppointmentTime: false,
      Time: new Date(new Date().setHours(0, 0)) // 时间弹框隐藏时间格式清空为0:0
    });
  }

}

const hangerStore = new HangerStore();
export default hangerStore;
