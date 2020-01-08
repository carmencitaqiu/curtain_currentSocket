import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";

@inject("deviceStore")
@withRouter
@observer
class Inner extends Component {
  render() {
    const { deviceStore } = this.props;
    const { roomList, curRoomId,houseList } = deviceStore;
    return (
      <div className="inner room_outer">
        {
          houseList.map((data,idx) => {
            return (
              <React.Fragment key={data.houseId}>
                <div className="room_innertitle">{data.houseName}</div>
                  <div className="room_listouter">
                    <div className="list">
                      {
                        data.roomList.map((roomData,rIndex) => {
                          const { roomId, roomName } = roomData;
                          return (
                          <div className={`item${roomId === curRoomId ? " active" : ""}`} key={roomId} 
                            onClick={() => deviceStore.setRoomId(roomId)}>
                            {roomName}</div>
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
