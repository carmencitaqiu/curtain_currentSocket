import BaseStore from "./baseStore/BaseStore";
import deviceStore from "./deviceStore";

class MockDataStore extends BaseStore {
  deviceDetailReturn = {
    parameter: {
      device: {
        deviceId: "00B0150102020310210659151785768923",
        deviceName: "某某窗帘",
        deviceOnLine: "1",
        brand: "01",
        deviceType: "",
        houseId: "c5624fc584644173b5852df8be46d2b1",
        imagLocalDrawable: 0,
        imgActionDrawable: 0,
        imgOfflineDrawable: 0,
        imgOnlineDrawable: 0,
        manufacturer: "B015",
        model: "1021",
        parentDevId: "",
        roomId: "cfaacb8a9fe0439f889fe19111d85af7",
        deviceAttributes: [
          {
            attributes: [
              { attribName: "name", attribValue: "智能网关" },
              {
                attribName: "houseId",
                attribValue: "c5624fc584644173b5852df8be46d2b1"
              },
              { attribName: "roomId", attribValue: "" },
              { attribName: "position", attribValue: "" },
              { attribName: "sceneBindId", attribValue: "" }
            ],
            serialId: "0"
          }
        ],
        deviceStatus: [
          {
            deviceStatusSerial: [
              { curStatusValue: "1", statusName: "POWER" },
              { curStatusValue: "1", statusName: "LIGHT" },
              { curStatusValue: "3", statusName: "WORK_MODE" },

              { curStatusValue: "15", statusName: "WORK_TIME" },

              { curStatusValue: "0", statusName: "DIRECTION" },
              { curStatusValue: "1", statusName: "TOP_POSITION" },
              { curStatusValue: "100", statusName: "MOTOR_POS"}
            ],
            serialId: 0,
            serialName: "线路一"
          }
        ],
        // 支持倒计时
        isCountDown: "1",
        resourceList: [
          {
            serialId: 0,
            serialName: "智能插座",
            resourceSerial: [
              {
                resourceName: "COUNTDOWN", // 倒计时资源
                resourceInfo: [
                  {
                    resourceName: "COUNTDOWN",
                    COUNTDOWN_ID: "1",
                    HOUR: "1", // 小时数
                    MINUTE: "47", // 分钟数
                    ACTION: '[{"cmdName":"SET_POWER","cmdParam":"1"}]' // 倒计时的开或关
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    error_code: 0,
    error_msg: "成功",
    sequenceNo: "201906241421190026"
  };

  roomListReturn = {
    parameter: {
      houseList: [
        {
          houseId: "c5624fc584644173b5852df8be46d2b1",
          houseName: "我的家",
          houseType: "0",
          roomList: [
            {
              roomId: "cfaacb8a9fe0439f889fe19111d85af7",
              roomName: "厨房",
              roomType: "0"
            },
            {
              roomId: "d21575c4b81e412d9f8238dc771ca821",
              roomName: "餐厅",
              roomType: "1"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620887",
              roomName: "主卧",
              roomType: "2"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620888",
              roomName: "过道",
              roomType: "3"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620889",
              roomName: "书桌",
              roomType: "4"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620890",
              roomName: "卧室",
              roomType: "5"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620891",
              roomName: "活动室",
              roomType: "6"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620892",
              roomName: "大阳台",
              roomType: "7"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620893",
              roomName: "衣帽间",
              roomType: "8"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620894",
              roomName: "玄关",
              roomType: "9"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620895",
              roomName: "储藏间",
              roomType: "10"
            }
          ]
        },{
          houseId: "c5624fc584644173b5852df8be46d2b2",
          houseName: "我的家2",
          houseType: "0",
          roomList: [
            {
              roomId: "cfaacb8a9fe0439f889fe19111d85af7",
              roomName: "厨房",
              roomType: "0"
            },
            {
              roomId: "d21575c4b81e412d9f8238dc771ca821",
              roomName: "餐厅",
              roomType: "1"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620887",
              roomName: "主卧",
              roomType: "2"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620888",
              roomName: "过道",
              roomType: "3"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620889",
              roomName: "书桌",
              roomType: "4"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620890",
              roomName: "卧室",
              roomType: "5"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620891",
              roomName: "活动室",
              roomType: "6"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620892",
              roomName: "大阳台",
              roomType: "7"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620893",
              roomName: "衣帽间",
              roomType: "8"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620894",
              roomName: "玄关",
              roomType: "9"
            },
            {
              roomId: "fbc49ea8da5a42eaacf8fcaf5d620895",
              roomName: "储藏间",
              roomType: "10"
            }
          ]
        }
      ]
    },
    error_code: 0,
    error_msg: "成功",
    sequenceNo: "201906241421200027"
  };

  navigateWebViewReturn = {
    historyLength: "1",
    type: "left"
  };

  deviceStatusChangeReturn = {
    error_code: "0",
    error_msg: "成功",
    messageType: "SmartHome_Callback",
    parameter: {
      deviceId: "00B0150102020310210659151785768923",
      deviceStatus: [
        {
          deviceStatusSerial: [{ curStatusValue: "0", statusName: "POWER" }],
          serialId: 1
        },
        {
          deviceStatusSerial: [{ curStatusValue: "0", statusName: "POWER" }],
          serialId: 2
        },
        {
          deviceStatusSerial: [{ curStatusValue: "0", statusName: "POWER" }],
          serialId: 3
        }
      ],
      error_code: 0,
      status: 0,
      time: "20190624143219"
    },
    sequenceNo: "201906241432191314"
  };

  /**
   * @method 模拟数据初始化
   */
  init() {
    this.initDetail();
    this.initRoomList();
    this.initHouseList();
  }

  initDetail() {
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

      isCountDown,

      warnList,
      functionList,
      houseId,
      roomId,
      parentDevId
    } = this.deviceDetailReturn.parameter.device;
    deviceStore.deviceName = deviceName || ""; // 设备名称（默认为设备商品名称，当商品名称为空时，默认为设备型号），默认设备名称，如果线路中的属性name为空时，取这个为默认值
    deviceStore.platform = platform || ""; // 归属平台ID
    deviceStore.manufacturer = manufacturer || ""; // 设备厂商ID
    deviceStore.brand = brand || ""; // 品牌ID
    deviceStore.model = model || ""; // 型号ID
    deviceStore.deviceOnLine = deviceOnLine || ""; // 设备状态 - 0：离线，1：在线

    deviceStore.isCountDown = isCountDown === "1"; // 是否支持倒计时 1支持 0 不支持

    deviceStore.resourceList = resourceList || []; // 设备资源列表
    deviceStore.warnList = warnList || []; // 设备告警信息列表
    deviceStore.functionList = functionList || []; // 设备功能列表
    deviceStore.houseId = houseId || ""; // 房子唯一标识（同一用户下）
    deviceStore.roomId = roomId || ""; // 房间唯一标识（同一用户下） 默认房间id，如果线路中的属性roomId为空时，取这个为默认值
    deviceStore.deviceType = deviceType || ""; // 0：普通设备，1：网关设备，2：子设备，3：附属普通设备，4：附属子设备，5：他人共享的设备
    deviceStore.parentDevId = parentDevId || ""; // 上级设备标识，此处填网关/属主设备的ID

    deviceStore.setState({
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
      deviceChangeed: deviceStore.deviceChangeed + 1
    });
  }

  initRoomList() {
    const { houseId } = deviceStore;
    let list = this.roomListReturn.parameter.houseList.filter(
      d => d.houseId === houseId
    );
    list = list[0] ? list[0] : null;
    //设置房间列表
    deviceStore.setState({
      houseName: list ? list.houseName : "",
      houseType: list ? list.houseType : "",
      roomList: list ? list.roomList : [],
      deviceChangeed: deviceStore.deviceChangeed + 1
    });
  }

  initHouseList() {
    deviceStore.setState({
      houseList: this.roomListReturn.parameter.houseList
    });
  }
}
const mockDataStore = new MockDataStore();
export default mockDataStore;
