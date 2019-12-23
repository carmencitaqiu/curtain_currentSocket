import { observable, computed,action } from "mobx";
import BaseStore from "./baseStore/BaseStore";
import deviceStore from "./deviceStore";

class CurtainStore extends BaseStore {
	@observable percent = 0;
	@observable isPlaying = false;

	/**
	 * @method 获取进度百分比
	 * @param {Object} data
	 * @param {Function} _success
	 */
	@action getPercent(data,_success) {
		const { percent } = this;
		this.setState({
			percent: 30
		});
	}

	/**
	 * 
	 * @param {*} percent 
	 */
	@action setPercent(per) {
		this.setState({
			percent: per
		});
	}

	@action togglePlay() {
		this.isPlaying = !this.isPlaying;
	}

	@computed get playIcon() {
		return this.isPlaying ? 'pause_icon' : 'pause_icon';
	}

	controlDevice(cmdParam) {
		const { deviceId, curSerialId, statusMap } = deviceStore;
		if (statusMap[curSerialId]) {
			deviceStore.controlDevice(cmdParam,
			() => {
				setTimeout(() => {
					deviceStore.getDeviceDetail(deviceId, data => {
						
					});
				  }, 500);
			});
		  }
	}

}

const curtainStore = new CurtainStore();
export default curtainStore;