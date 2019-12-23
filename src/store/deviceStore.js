import { observable, action, computed } from "mobx";
import BaseStore from "./baseStore/BaseStore";
import configStore from "./baseStore/configStore";
import nativeStore from "./nativeStore";
import hangerStore from "./hangerStore";

// const doNull = () => {};

/**
 * @class DeviceStore
 * @extends {BaseStore}
 * @description 设备持久化状态管理对象
 * @author Lcp
 */
class DeviceStore extends BaseStore {
  @observable deviceChangeed = 0; //设备详情或设备状态发生改变时必定会改变的值

  noTwice = {
    //防抖参数存储
    saveResouceTag: false // 保存设备资源标识
  };

  deviceId = ""; // 设备唯一标识
  deviceName = ""; // 设备名称（默认为设备商品名称，当商品名称为空时，默认为设备型号）
  // NOTE  默认设备名称，如果线路中的属性name为空时，取这个为默认值

  platform = ""; // 归属平台ID
  manufacturer = ""; // 设备厂商ID
  brand = ""; // 品牌ID
  model = ""; // 型号ID
  @observable deviceOnLine = "1"; // 设备状态 - 0：离线，1：在线

  @observable deviceStatus = []; // 设备当前状态，设备的全部状态，如开关，模式等。
  @observable deviceAttributes = []; // 设备属性列表
  @observable curSerialId = "0"; // 当前所选择的线路id，初始获取设备详情时，默认取第一个线路id
  @observable subDevList = []; // 子设备列表，设备为网关时包含
  @observable roomList = []; // 房间列表，通过getRoomList方法获取

  @observable timeInfo = {
    isShow: false, // 倒计时是否正在进行，true倒计时开启状态，消失为停止字样
    hh: "0",
    mm: "0"
  };

  isCountDown = true; // 是否支持倒计时
  isSchedule = true; // 是否支持定时
  SCActionList = [
    // 定时器和倒计时命令指令列表
    '[{"cmdName":"SET_POWER","cmdParam":"0"}]',
    '[{"cmdName":"SET_POWER","cmdParam":"1"}]'
  ];

  resourceList = []; // 设备资源列表
  warnList = []; // 设备告警信息列表
  functionList = []; // 设备功能列表
  houseId = ""; // 房子唯一标识（同一用户下）
  houseName = ""; // 房子名称（同一用户下）
  houseType = ""; //房子类型，好像只有值"0"
  roomId = ""; // 房间唯一标识（同一用户下）
  // NOTE  默认房间id，如果线路中的属性roomId为空时，取这个为默认值

  deviceType = ""; // 0：普通设备，1：网关设备，2：子设备，3：附属普通设备，4：附属子设备，5：他人共享的设备
  deviceTypes = [
    "普通设备",
    "网关设备",
    "子设备",
    "附属普通设备",
    "附属子设备",
    "他人共享的设备"
  ];
  parentDevId = ""; // 上级设备标识，此处填网关/属主设备的ID

  /*** 合理化计算值 ***/
  /**
   * @property attributeMap [当前所有线路的属性列表映射]
   * @readonly
   * @note [根据线路读取属性（键值对）]
   * @example
   * attributeMap[this.curSerialId].name //读取线路1下的设备名称
   * attributeMap[this.curSerialId].roomId //读取线路1下的房间id
   */
  @computed get attributeMap() {
    let maps = {};
    this.deviceAttributes.forEach(d => {
      const { serialId, attributes } = d;
      let maps2 = {};
      attributes.forEach(({ attribName, attribValue }) => {
        maps2[attribName] = attribValue;
      });
      maps[serialId] = maps2;
    });
    return maps;
  }

  /**
   * @property currentStatus [当前线路的状态列表映射]
   * @readonly
   * @note [读取当前线路状态（键值对）]
   * @example
   * currentStatus["POWER"] //读取线路1下的电源状态
   */
  @computed get currentStatus() {
    const { statusMap, curSerialId } = this;
    return statusMap[curSerialId];
  }

  /**
   * @property statusMap [当前所有线路的状态列表映射]
   * @readonly
   * @note [根据线路读取状态（键值对）]
   * @example
   * statusMap[this.curSerialId]["POWER"] //读取线路1下的电源状态
   */
  @computed get statusMap() {
    let maps = {};
    this.deviceStatus.forEach(d => {
      const { serialId, deviceStatusSerial } = d;
      let maps2 = {};
      deviceStatusSerial.forEach(({ statusName, curStatusValue }) => {
        maps2[statusName] = curStatusValue;
      });
      maps[serialId] = maps2;
    });
    return maps;
  }

  /**
   * @property name [当前线路的设备名称]
   * @readonly
   * @note [单线路可以直接读取此值作为设备名称，多线路需要配置对应的curSerialId之后再取该值]
   */
  @computed get name() {
    const { deviceChangeed, curSerialId, attributeMap, deviceName } = this;
    if (deviceChangeed > 0) {
      return attributeMap[curSerialId].name || deviceName;
    }
    return "";
  }
  /**
   * @property roomMap [房间列表映射，id-name]
   * @readonly
   * @example
   * roomMap["cfaacb8a9fe0439f889fe19111d85af7"] //return "默认房间"
   */
  @computed get roomMap() {
    let maps = {};
    this.roomList.forEach(({ roomId, roomName }) => {
      maps[roomId] = roomName;
    });
    return maps;
  }
  /**
   * @property curRoomId [当前线路的所选房间roomId]
   * @readonly
   * @note [单线路可以直接读取此值作为设备名称，多线路需要配置对应的curSerialId之后再取该值]
   */
  @computed get curRoomId() {
    let { deviceChangeed, curSerialId, attributeMap, roomId } = this;
    if (deviceChangeed > 0) {
      return attributeMap[curSerialId].roomId || roomId;
    }
    return "";
  }

  /**
   * @property countDownList [倒计时]
   * @readonly
   * @note [根据设备详情中的资源列表读取到的倒计时]
   */
  @computed get countDownList() {
    const { resourceList, isCountDown, curSerialId } = this;
    let list = null;
    if (!isCountDown) {
      configStore.infoMsg("~~~", "该设备不支持倒计时功能");
      // NOTE 暂时先不管支不支持倒计时，都统一获取一遍倒计时
      // return list;
    }

    // eslint-disable-next-line eqeqeq
    const rList = resourceList.filter(d => d.serialId == curSerialId);
    // 拉取同线路的定时器列表为空时
    if (rList.slice().length === 0) return list;
    const cList = rList[0].resourceSerial.filter(
      d => d.resourceName === "COUNTDOWN"
    );
    // 拉取定时器列表为空时
    if (cList.slice().length === 0) return list;
    let {
        COUNTDOWN_ID,
        COUNTDOWN_NAME,
        HOUR,
        MINUTE,
        ACTION
      } = cList[0].resourceInfo[0],
      power = "1";
    try {
      let v = JSON.parse(ACTION);
      v.forEach(({ cmdName, cmdParam }) => {
        if (cmdName === "SET_POWER") {
          power = cmdParam;
        }
      });
    } catch (e) {}

    list = {
      id: COUNTDOWN_ID,
      name: COUNTDOWN_NAME,
      hh: +HOUR || 0,
      mm: +MINUTE || 0,
      power
    };
    return list;
  }

  /**
   * @property [在对设备进行某些操作时,判断设备是否可以被控制的通用方法]
   * @readonly
   * @note [主要判断依据：设备详情是否获取成功]
   */
  @computed get isControl() {
    return this.deviceChangeed !== 0;
  }

  @observable isShowDeviceName = false; //控制是否显示设置设备名称
  /**
   * @method 显示弹窗
   */
  showDeviceName() {
    this.setState({
      isShowDeviceName: !!1
    });
  }
  /**
   * @method 关闭弹窗
   */
  hideDeviceName() {
    this.setState({
      isShowDeviceName: !!0
    });
  }

  /**
   * @method 设置当前线路id
   * @param {String} curSerialId
   * @note [初始化时默认选择第一个线路]
   * @note [切换线路时请调用该方法重新设置当前线路id]
   */
  setCurSerialId(curSerialId) {
    // NOTE 阻止设备详情未读取时设置该值
    if (!this.isControl) return;

    this.setState({
      curSerialId
    });
  }

  /**
   * @method 设置设备名
   * @param {String} deviceName
   * @note [此处方法自动读取当前线路设置相应的属性name的值]
   */
  @action
  setDeviceName(deviceName) {
    // NOTE 阻止设备详情未读取时设置该值
    if (!this.isControl) return;

    const { name, curSerialId } = this;
    if (name !== deviceName) {
      // 过滤设备名称一致的情况
      this.setDeviceProperty({
        deviceAttributes: [
          {
            serialId: curSerialId,
            attributes: [
              {
                attribName: "name",
                attribValue: deviceName
              }
            ]
          }
        ]
      });
    }
  }

  /**
   * @method 设置设备当前线路所属房间
   * @param {String} roomId
   * @note [此处方法自动读取当前线路设置相应的属性roomId的值]
   */
  @action
  setRoomId(roomId) {
    // NOTE 阻止设备详情未读取时设置该值
    if (!this.isControl) return;

    const { curRoomId, curSerialId } = this;
    if (curRoomId !== roomId) {
      // 过滤房间id一致的情况
      this.setDeviceProperty({
        deviceAttributes: [
          {
            serialId: curSerialId,
            attributes: [
              {
                attribName: "roomId",
                attribValue: roomId
              }
            ]
          }
        ]
      });
    }
  }

  /**
   * @method 设置设备状态
   * @param {Object} result
   * @note [这里是源生发现设备状态发生了改变，然后调用JS来更新页面状态，所以该方法，页面中请不要调用]
   */
  setDeviceStatus(result) {
    // NOTE 阻止设备详情未读取时设置该值
    if (!this.isControl) return;

    const { deviceId, deviceStatus } = result;
    //阻止非正常状态接收
    if (deviceStatus.length === 0) return;

    // NOTE 如果当前deviceId与当前deviceId相匹配
    if (deviceId === this.deviceId) {
      deviceStatus.map(({ deviceStatusSerial, serialId }) => {
        let maps = {};
        deviceStatusSerial.forEach(({ statusName, curStatusValue }) => {
          maps[statusName] = curStatusValue;
        });

        this.deviceStatus
          .filter(d => d.serialId === serialId)[0]
          .deviceStatusSerial.forEach(d => {
            const { statusName } = d;
            if (statusName in maps) {
              d.curStatusValue = maps[statusName];
            }
          });
      });

      // NOTE 测试回调
      configStore.infoMsg("~~~", JSON.stringify(this.deviceStatus));

      this.setState({
        deviceChangeed: this.deviceChangeed + 1
      });
    }
  }

  /**
   * @method 设备初始化操作，包含获取设备详情信息，房间列表(延时500ms)
   */
  init(_deviceId) {
    let deviceId = _deviceId || this.getSearchQueryString("deviceId");

    // NOTE 如果是调试模式，这里会给一款默认调试设备
    if (configStore.debug) {
      deviceId = deviceId || "D1D0010001085212052019122000013217";
    }
    this.deviceId = deviceId;

    // NOTE deviceId获取失败处理
    if (!deviceId) {
      this.toastString("deviceId获取失败");
      return;
    }

    //获取设备详情
    this.getDeviceDetail(deviceId, data => {
      const {
        deviceName,
        platform,
        manufacturer,
        brand,
        model,
        deviceOnLine,
        deviceType,
        deviceStatus,
        deviceAttributes,
        subDevList,
        resourceList,
        warnList,
        functionList,
        houseId,
        roomId,

        isCountDown,

        parentDevId
      } = data.device;
      this.deviceName = deviceName || ""; // 设备名称（默认为设备商品名称，当商品名称为空时，默认为设备型号），默认设备名称，如果线路中的属性name为空时，取这个为默认值

      this.isCountDown = isCountDown === "1"; // 是否支持倒计时 1支持 0 不支持

      this.platform = platform || ""; // 归属平台ID
      this.manufacturer = manufacturer || ""; // 设备厂商ID
      this.brand = brand || ""; // 品牌ID
      this.model = model || ""; // 型号ID
      this.deviceOnLine = deviceOnLine || ""; // 设备状态 - 0：离线，1：在线
      this.resourceList = resourceList || []; // 设备资源列表
      this.warnList = warnList || []; // 设备告警信息列表
      this.functionList = functionList || []; // 设备功能列表
      this.houseId = houseId || ""; // 房子唯一标识（同一用户下）
      this.roomId = roomId || ""; // 房间唯一标识（同一用户下） 默认房间id，如果线路中的属性roomId为空时，取这个为默认值
      this.deviceType = deviceType || ""; // 0：普通设备，1：网关设备，2：子设备，3：附属普通设备，4：附属子设备，5：他人共享的设备
      this.parentDevId = parentDevId || ""; // 上级设备标识，此处填网关/属主设备的ID

      this.setState({
        deviceStatus: deviceStatus || [], // 设备当前状态，设备的全部状态，如开关，模式等。
        curSerialId: deviceAttributes[0].serialId, // 当前所选择的线路id，初始获取设备详情时，默认取第一个线路id
        deviceAttributes:
          deviceAttributes.map(d => {
            // NOTE  遍历属性列表，强制设置name和roomId的默认值，如果值为空时
            d.attributes.forEach(d => {
              const { attribName, attribValue } = d;
              if (attribName === "name" && !attribValue) {
                d.attribValue = deviceName || "";
              } else if (attribName === "roomId" && !attribValue) {
                d.attribValue = roomId || "";
              }
            });
            return d;
          }) || [], // 设备属性列表
        subDevList: subDevList || [], // 子设备列表，设备为网关时包含
        deviceChangeed: this.deviceChangeed + 1,
        deviceOnLine:deviceOnLine
      });

      // NOTE  获取房间列表 - 延时500ms
      setTimeout(() => {
        this.getRoomList();
        this.getTimeInfo();
      }, 500);
    });
  }

  /**
   * @method 获取设备详情封装,可用于获取子设备详情
   * @param {String} deviceId
   * @param {Function} success [必填]
   */
  getDeviceDetail(deviceId, success) {
    if (deviceId) {
      nativeStore.callAppMethod("jsGetDeviceDetail", deviceId, success);
    } else {
      this.toastString("deviceId不能为空");
    }
  }

  /**
   * @method 获取房间列表
   * @requires 必须先获取设备详情，查询出该设备所属houseId
   */
  getRoomList() {
    // NOTE 阻止设备详情未读取时获取该值
    if (!this.isControl) return;

    nativeStore.callAppMethod("jsGetRoomList", "", rst => {
      const { houseId } = this;
      let list = rst.houseList.filter(d => d.houseId === houseId);
      list = list[0] ? list[0] : null;
      //设置房间列表
      this.setState({
        houseName: list ? list.houseName : "",
        houseType: list ? list.houseType : "",
        roomList: list ? list.roomList : [],
        deviceChangeed: this.deviceChangeed + 1
      });
    });
  }

  /**
   * @method 获取倒计时信息
   * @requires 必须先获取设备详情
   */
  getTimeInfo() {
    // NOTE 阻止设备详情未读取时获取该值
    if (!this.isControl) return;

    nativeStore.callAppMethod("jsGetTimeInfo", "" + this.deviceId, rst => {
      //设置倒计时信息
      this.setState({
        timeInfo: rst
      });
      //如果当前倒计时正在进行，则H5本地也同步开始进行倒计时，但是误差会有1分钟内的时间
      if (rst.isShow) {
        hangerStore.openOrClose();
      }
    });
  }
  /**
   * @method 控制设备统一方法
   * @param {Object} data
   * @param {Function} success
   * @example
   * controlDevice({
   *    "deviceId":"XXXXXXX",
   *    "serialId":"1",
   *    "actionCmdSerial":[
   *      {"cmdName": "SET_POWER","cmdParam": "1"}
   *    ]
   * });
   */
  @action
  controlDevice(data, _success) {
    // NOTE 阻止设备详情未读取时设置该值
    if (!this.isControl) return;

    if (typeof data === "string") {
      configStore.errorMsg(
        "控制设备参数必须是一个Object，包含线路和状态变更数组！"
      );
      return;
    }
    const success = _success
      ? _success
      : () => {
          const { serialId, actionCmdSerial } = data;
          const maps = {};
          actionCmdSerial.forEach(({ cmdName, cmdParam }) => {
            maps[cmdName.split("_")[1]] = cmdParam;
          });
          this.deviceStatus
            // eslint-disable-next-line eqeqeq
            .filter(d => d.serialId == serialId)[0]
            .deviceStatusSerial.forEach(d => {
              const { statusName } = d;
              if (statusName in maps) {
                d.curStatusValue = maps[statusName];
              }
            });
          //强制刷新
          this.setState({
            deviceChangeed: this.deviceChangeed + 1
          });

        };
    nativeStore.callAppMethod("jsControlDevice", data, success);
  }

  /**
   * @method 设置设备属性统一方法
   * @param {Object} data
   * @param {Function} success
   * @example
   * setDeviceProperty({
   *    "deviceAttributes":[
   *      {
   *        "serialId":"0",
   *        "attributes": [
   *          {"attribName": "roomId","attribValue": "1"}
   *        ]
   *      }
   *    ]
   * });
   */
  @action
  setDeviceProperty(data, _success) {
    // NOTE 阻止设备详情未读取时设置该值
    if (!this.isControl) return;

    if (typeof data === "string") {
      configStore.errorMsg(
        "设置设备属性参数必须是一个Object，包含线路和状态变更数组！"
      );
      return;
    }
    const success = _success
      ? _success
      : () => {
          data.deviceAttributes.forEach(({ serialId, attributes }) => {
            let maps = {};
            attributes.forEach(({ attribName, attribValue }) => {
              maps[attribName] = attribValue;
            });
            this.deviceAttributes
              // eslint-disable-next-line eqeqeq
              .filter(d => d.serialId == serialId)[0]
              .attributes.forEach(d => {
                const { attribName } = d;
                if (attribName in maps) {
                  d.attribValue = maps[attribName];
                }
              });
          });

          //强制刷新
          this.setState({
            deviceChangeed: this.deviceChangeed + 1
          });
          this.toastString("设置成功");
        };
    nativeStore.callAppMethod("jsSetDeviceProperty", data, success);
  }

  /**
   * @method 设置设备资源（倒计时资源）
   * @param {String} resourceName [资源名]
   * @param {Array<Object>|Object} resourceInfo [资源信息]
   * @param {Function} success [必填]
   * @example
   * this.saveDeviceResource("COUNTDOWN", [
   *   {
   *     MODE: "1",
   *     COUNTDOWN_ID: "",
   *     TIME: "1567778400",
   *     MREPEAT_CYCLE: "",
   *     ACTIVE: "1",
   *     ACTION: '[{"cmdName":"SET_POWER","cmdParam":"0"}]'
   *   },
   *   {
   *     MODE: "1",
   *     COUNTDOWN_ID: "",
   *     ...
   *   }
   * ]);
   */
  saveDeviceResource(resourceName, resourceInfo, _success = () => {}) {
    // NOTE 阻止设备详情未读取时设置该值
    if (!this.isControl) return;

    if (this.noTwice.saveResouceTag) {
      this.toastString("请勿频繁操作");
      return;
    }
    this.noTwice.saveResouceTag = true;
    setTimeout(() => {
      this.noTwice.saveResouceTag = false;
    }, 2000);

    if (Object.prototype.toString.call(resourceInfo) !== "[object Array]") {
      configStore.errorMsg("设置设备资源信息参数必须是一个Array<Object>！");
      return;
    }
    const { deviceId, curSerialId } = this;
    const data = {
      deviceId,
      resouceList: [
        {
          serialId: curSerialId,
          resourceSerial: [
            {
              resourceName,
              resourceInfo
            }
          ]
        }
      ]
    };
    const success = () => {
      _success();
      this.toastString("设置成功");
      // NOTE 重新获取设备详情以拉取资源列表
      setTimeout(() => {
        this.getDeviceDetail(this.deviceId, data => {
          const { resourceList } = data.device;
          this.setState({
            resourceList: resourceList || [], // 设备资源列表
            deviceChangeed: this.deviceChangeed + 1
          });
        });
      }, 500);
    };
    nativeStore.callAppMethod("jsSaveDeviceResource", data, success);
  }

  // NOTE 倒计时增删改方法
  saveCountDown(resourceInfo, success) {
    this.saveDeviceResource("COUNTDOWN", resourceInfo, success);
  }
  /**
   * @method addCountDown
   * @description [添加倒计时信息]
   * @param {Array<Object>} dataList
   */
  addCountDown(dataList, success) {
    const list = dataList.length ? dataList : [dataList];
    this.saveCountDown(
      list.map(d => {
        const { hh, mm, power } = d;
        const dist = new Date(+new Date() + (hh * 60 + mm) * 60 * 1000),
          h = dist.getHours(),
          m = dist.getMinutes();
        const t =
          (h < 10 ? "0" + h : h) +
          ":" +
          (m < 10 ? "0" + m : m) +
          " " +
          (power === "1" ? "开" : "关");
        const a = this.SCActionList[power] || this.SCActionList[0];
        return {
          MODE: "1",
          COUNTDOWN_ID: "",
          COUNTDOWN_NAME: t,
          HOUR: hh + "", // 小时数
          MINUTE: mm + "", // 分钟数
          ACTION: a
        };
      }),
      success
    );
  }
  /**
   * @method deleteCountDown
   * @description [取消倒计时信息]
   * @param {Array<Object>} dataList
   */
  deleteCountDown(dataList, success) {
    const list = dataList.length ? dataList : [dataList];
    this.saveCountDown(
      list.map(d => {
        return {
          MODE: "3",
          COUNTDOWN_ID: d.id
        };
      }),
      success
    );
  }

  /**
   * @method 获取partnerToken
   * @param {String} partnerId
   * @param {Function} success [必填]
   * @example
   * partner_token
   * getPartnerTokenWithPartnerId("706aa632732d438fab2cbcc89656fef9",(rst)=>{
   *    // 访问智能家居平台的访问令牌（第三方token）
   *    const { partner_token } = rst;
   *    // do something
   * })
   */
  getPartnerTokenWithPartnerId(partnerId, success) {
    // NOTE 阻止设备详情未读取时设置该值
    if (!this.isControl) return;

    if (typeof partnerId === "string") {
      configStore.errorMsg(
        "设置设备属性参数必须是一个Object，包含线路和状态变更数组！"
      );
      return;
    }
    nativeStore.callAppMethod(
      "jsGetPartnerTokenWithPartnerId",
      partnerId,
      success
    );
  }

  /**
   * @method 跳转到网关关联的产商添加设备列表页（源生页）
   */
  goSubDevList() {
    // NOTE 阻止设备详情未读取时进行操作
    if (!this.isControl) return;

    nativeStore.callAppMethod("jsJumToDefineBrandListPage", this.manufacturer);
  }

  /*** 以下源生方法 - 与设备无关 ****/

  /**
   * @method 监听路由变化，设置此时的源生导航栏状态
   * @param {Object} route
   * @example
   * Object {pathname: "/", search: "", hash: "", state: undefined}
   * Object {pathname: "/NextPage", search: "", hash: "", state: undefined}
   */
  nowIndex = 1; //当前是否处于首页状态，默认首页状态
  listenToHashChange(route) {
    const { nowIndex } = this;
    const { pathname } = route;
    // NOTE 跳转到首页，且当前不是首页导航
    if (pathname === "/" && !nowIndex) {
      this.setNavigationStyle(0);
      this.nowIndex = 1; // 修改为首页状态
    }
    // NOTE 跳转到非首页，且当前是首页导航
    if (pathname !== "/" && nowIndex) {
      this.setNavigationStyle(1);
      this.nowIndex = 0; // 修改为非首页状态
    }
  }

  /**
   * @method 设置导航栏样式
   * @param {String || Number} [left="0"]
   * @param {String || Number} [middle="1"]
   * @param {String || Number} [right="0"]
   */
  setNavigationStyle(a = 0, b = 1, c = 0) {
    const maps = ["0", "1"];
    const left = maps[a];
    const middle = maps[b];
    const right = maps[c];
    nativeStore.callAppMethod("jsSetNavigationStyle", [
      {
        type: "left",
        isShow: left,
        icon: ""
      },
      {
        type: "middle",
        isShow: middle,
        icon: ""
      },
      {
        type: "right",
        isShow: right,
        icon: ""
      }
    ]);
  }

  /**
   * @method 调用源生Toast方法弹出警告信息
   * @param {String} msg [必填]
   */
  lastToastMsg = "";
  lastToastTime = false;
  toastString(msg) {
    const { lastToastTime, lastToastMsg } = this;
    if (lastToastTime && lastToastMsg === msg) {
      return; // NOTE 阻止同一时间段，相同信息弹出
    }
    if (msg) {
      this.lastToastTime = true;
      this.lastToastMsg = msg;
      setTimeout(() => {
        this.lastToastTime = false;
      }, 1000);
      nativeStore.callAppMethod("jsToastString", msg);
    }
  }

  /**
   * @method 获取webView历史栈长度
   * @param {Function} [success]
   */
  getWebViewHistoryLength(success) {
    nativeStore.callAppMethod("jsGetWebViewHistoryLength", "", success);
  }

  /**
   * @method 关闭webview
   */
  closeWebView() {
    nativeStore.callAppMethod("jsCloseWebView");
  }

  /** 工具方法 **/
  /**
   * @method 获取地址栏传参
   * @param {String} name
   * @returns {String}
   */
  getSearchQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let search = window.location.search;
    let r = search.substr(search.indexOf("?") + 1).match(reg);
    if (r !== null) return decodeURI(r[2]);
    return "";
  }
}
const deviceStore = new DeviceStore();
export default deviceStore;
