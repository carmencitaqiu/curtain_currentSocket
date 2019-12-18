import { observable, action } from "mobx";
import config from "./configStore";
import fetchJson from "./fetchJson";

const submitSymbol = Symbol("submit");
const nullEval = () => {}; //空调用
const typeMap = { GET: "GET", POST: "POST" };

const { errorMsg, infoMsg } = config; //读取项目基本配置状态

/**
 * @author Lcp
 * @class BaseStore [所有状态类的基本继承父类]
 * @time  2019-06-17
 */
class BaseStore {
  @observable _updateTimes = 0; // NOTE 记录本状态集更新总次数

  /**
   * @method  所有可观察状态均从该方法去改变
   * @note [强制要求，规范基准]
   * @param {object} state
   */
  @action
  setState(state) {
    for (let i in state) {
      const v = state[i];
      if (v !== this[i]) {
        this[i] = v;
      }
    }
    this._updateTimes++;
  }

  /**
   * @method `ajax`
   * @param  {the same follows}
   */
  get = (url, data, success, error, final) => {
    this[submitSymbol]("GET", url, data, success, error, final);
  };
  post = (url, data, success, error, final) => {
    this[submitSymbol]("POST", url, data, success, error, final);
  };
  submit = (...rest) => {
    this.post(...rest);
  };

  /**
   * @method submit             基本请求方法封装
   * @private
   * @param {String}    type    发送请求类型 // 选值GET|POST，默认GET
   * @param {String}    url     请求相对地址
   * @param {Object}    data    请求参数
   * @param {Function}  success 请求成功后回调
   * @param {Function}  error   失败后回调
   * @param {Function}  final   成功或失败后执行的回调
   */
  async [submitSymbol](
    type = "GET",
    url,
    data = {},
    success = nullEval,
    error = nullEval,
    final = nullEval
  ) {
    if (!url) {
      errorMsg("请求地址不能为空！！！");
      return;
    }
    const _type = typeMap[type.toLocaleUpperCase()] || "GET";
    const rst = await fetchJson(_type, url, data || {});
    if (rst) {
      // 不是重复提交的情况下
      const { code, result, message } = rst;
      // infoMsg(code, result, message);
      if (code === 0) {
        success(result);
      } else {
        error(rst);
      }
      final(rst);
    }
  }
}

export default BaseStore;
