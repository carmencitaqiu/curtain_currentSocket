/**
 * @class         ConfigStore
 * @author        Lcp
 * @description   项目相关配置
 */
class ConfigStore {
  projectName = "Gateway"; //当前项目名

  debug = !!0; // 默认启用调试模式，[生产环境时，请把1改成0]

  apiUrl = "/nowIsNull"; // 项目API请求地址中间名

  loginOutCode = 9999; // 登录失效时的返回码
  /**
   * @method 登录失效后的回调方法
   */
  loginOutCallback = () => {};

  /**
   * @method 在控制台输出报错信息
   */
  errorMsg = (...msg) => {
    try {
      console.error(this.projectName, ...msg);
    } catch (e) {}
  };
  /**
   * @method 在控制台输出展示信息
   */
  infoMsg = (...msg) => {
    const { projectName, debug } = this;
    if (debug) {
      // NOTE 如果是调试模式下时，才会输出该段信息
      try {
        console.info(projectName, ...msg);
      } catch (e) {}
    }
  };
}
const configStore = new ConfigStore();
export default configStore;
