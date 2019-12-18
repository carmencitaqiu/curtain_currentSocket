import BaseStore from "./baseStore/BaseStore";
import {
  observable,
  action
} from "mobx";

// import deviceStore from './deviceStore';
class ElectricStore extends BaseStore {
  hh = 0
  mm = 0
  @action
  saveTime = date => {
    this.hh = date.getHours();
    this.mm = date.getMinutes();
  };

}
const electricStore = new ElectricStore();
export default electricStore;