import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";

let timer = null;

@inject("deviceStore")
@withRouter
@observer
class Inner extends Component {
  state = {
    ac_houseId: "",
    ac_roomId: ""
  };
  componentDidMount() {
    const { curRoomId, houseId } = this.props.deviceStore;
    this.setState({ ac_houseId: houseId, ac_roomId: curRoomId });
  }
  setRoom = (houseId, roomId) => {
    const { deviceStore } = this.props;
    const { ac_houseId, ac_roomId } = this.state;
    clearTimeout(timer);
    if (!(houseId === ac_houseId && roomId === ac_roomId)) {
      this.setState({ ac_houseId: houseId, ac_roomId: roomId }, () => {
        timer = setTimeout(() => {
          deviceStore.setRoomId_(houseId, roomId);
        }, 1500);
      });
    }
  };
  render() {
    const { deviceStore } = this.props;
    const { roomList, curRoomId, houseId, houseList = [] } = deviceStore;
    const { ac_houseId, ac_roomId } = this.state;
    const item = houseList.map((i, idx) => (
      <div className="houseInfo" key={idx}>
        <div className="houseName">{i.houseName}</div>
        <ul className="roomList">
          {i.roomList &&
            i.roomList.map((i1, idx1) => (
              <li
                className={`roomItem${
                  i.houseId === ac_houseId && i1.roomId === ac_roomId
                    ? " active"
                    : ""
                }`}
                key={idx1}
                onClick={this.setRoom.bind(this, i.houseId, i1.roomId)}
              >
                {i1.roomName}
              </li>
            ))}
        </ul>
      </div>
    ));
    return (
      <div className="inner">
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
        {item}
      </div>
    );
  }
}
export default Inner;
