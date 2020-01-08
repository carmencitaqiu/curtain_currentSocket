import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";


const list = [
  {houseId: "01", houseName: "天小翼的家1",
  roomList: [{
    roomId: "001",
    roomName: "厨房"
  },{
    roomId: "002",
    roomName: "餐厅"
  },{
    roomId: "003",
    roomName: "主卧"
  },{
    roomId: "004",
    roomName: "过道"
  },{
    roomId: "005",
    roomName: "卧室"
  },{
    roomId: "001",
    roomName: "厨房"
  },{
    roomId: "002",
    roomName: "餐厅"
  },{
    roomId: "003",
    roomName: "主卧"
  },{
    roomId: "004",
    roomName: "过道"
  },{
    roomId: "005",
    roomName: "卧室"
  }]
  },
  {houseId: "02", houseName: "天小翼的家2",
  roomList: [{
    roomId: "001",
    roomName: "厨房"
  },{
    roomId: "002",
    roomName: "餐厅"
  },{
    roomId: "003",
    roomName: "主卧"
  },{
    roomId: "004",
    roomName: "过道"
  },{
    roomId: "005",
    roomName: "卧室"
  },{
    roomId: "001",
    roomName: "厨房"
  },{
    roomId: "002",
    roomName: "餐厅"
  },{
    roomId: "003",
    roomName: "主卧"
  },{
    roomId: "004",
    roomName: "过道"
  },{
    roomId: "005",
    roomName: "卧室"
  }]
  }
];

@inject("deviceStore")
@withRouter
@observer
class Inner extends Component {
  render() {
    const { deviceStore } = this.props;
    const { roomList, curRoomId } = deviceStore;
    return (
      <div className="inner room_outer">
        {
          list.map((data,idx) => {
            return (
              <React.Fragment>
                <div className="room_innertitle">{data.houseName}</div>
                  <div className="room_listouter">
                    <div className="list">
                      {
                        data.roomList.map((roomData,rIndex) => {
                          return (
                          <div className="item">{roomData.roomName}</div>
                          );
                        })
                      }
                    </div>
                  </div>
            </React.Fragment>
            );
          })}

        {/* <ul className="Setting-list">
          {roomList.map((d, i) => {
            const { roomId, roomName } = d;
            return (
              <li
                className="Setting-list-item"
                onClick={() => deviceStore.setRoomId(roomId)}
                key={i}
              >
                <span>{roomName}</span>
                {curRoomId === roomId ? (
                  <i className="Setting-list-selected" />
                ) : null}
              </li>
            );
          })}
        </ul> */}
      </div>
    );
  }
}
export default Inner;
