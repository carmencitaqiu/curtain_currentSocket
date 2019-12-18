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
        <ul className="setting-list">
          <li className='setting-title'>天小翼的家</li>
          {roomList.map((d, i) => {
            const { roomId, roomName } = d;
            return (
              <li
                className={'setting-list-item' + (curRoomId === roomId ?' checked':'')}
                onClick={() => deviceStore.setRoomId(roomId)}
                key={i}
              >
                <span>{roomName}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default Inner;
