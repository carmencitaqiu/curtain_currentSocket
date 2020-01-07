import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";

@inject("deviceStore")
@withRouter
@observer
class Inner extends Component {
  render() {
    const { deviceStore } = this.props;
    const { roomList, curRoomId } = deviceStore;
    return (
      <div className="inner">
        <ul className="Setting-list">
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
        </ul>
      </div>
    );
  }
}
export default Inner;
