/**
 * @method Http请求发起封装，这里采用fetch
 */

import "whatwg-fetch";
import config from "./configStore";

const { apiUrl, loginOutCode, loginOutCallback, errorMsg, infoMsg } = config;

//以下为阻止重复提交操作
let sendList = [];
const checkSend = (type, ...rest) => {
  const key = rest.join(",");
  const index = sendList.indexOf(key);
  if (type === "start") {
    if (index > -1) {
      return false; //检测到重复提交
    } else {
      sendList.push(key);
    }
  } else if (index > -1) {
    sendList.splice(index, 1);
  }
  return true;
};

function fetchJson(method, path, data) {
  const body = JSON.stringify(data);
  const url = apiUrl + path;
  const checkFlag = checkSend("start", method, url, body);
  if (!checkFlag) {
    errorMsg("阻止重复提交：" + url + "\n" + body);
    return false;
  }
  return fetchJsonNext(method, url, body);
}
async function fetchJsonNext(method, url, body) {
  infoMsg("发送协议：" + url + "\n" + body);
  try {
    const res = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body
    });
    checkSend("end", method, url, body);
    const rsp = await res.json(); //此处400+与500+都会报错
    const { code, data, msg } = rsp;
    infoMsg("接收协议：" + url + "\n" + JSON.stringify(rsp));
    let result = { code, result: data, message: msg };
    if (code === loginOutCode) {
      //登录状态失效
      loginOutCallback(); //退出登录或进行相关
      result.result = {};
      return result;
    }
    return result;
  } catch (e) {
    checkSend("end", method, url, body);
    // errorMsg(e);
    return {
      code: -1,
      message: "服务器或网络连接异常"
    };
  }
}

export default fetchJson;
