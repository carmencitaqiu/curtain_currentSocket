import { observable, computed,action } from "mobx";
import BaseStore from "./baseStore/BaseStore";


class CurtainStore extends BaseStore {
	@observable percent = 0;

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
}

const curtainStore = new CurtainStore();
export default curtainStore;