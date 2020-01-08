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
      <div className="inner room_outer">
        <div>
          <div className="room_innertitle">天小翼的家</div>
          <div className="room_listouter">
            <div className="list">
              <div className="item">厨房</div>
              <div className="item">餐厅</div>
              <div className="item">主卧</div>
              <div className="item">过道</div>
              <div className="item">书桌</div>
              <div className="item active">卧室</div>
              <div className="item">活动室</div>
              <div className="item">大阳台</div>
              <div className="item">厨房</div>
              <div className="item">餐厅</div>
              <div className="item">主卧</div>
              <div className="item">过道</div>
            </div>
          </div>
        </div>

        <div>
          <div className="room_innertitle">天小翼的家</div>
          <div className="room_listouter">
            <div className="list">
              <div className="item">厨房</div>
              <div className="item">餐厅</div>
              <div className="item">主卧</div>
              <div className="item">过道</div>
              <div className="item">书桌</div>
              <div className="item">卧室</div>
              <div className="item">活动室</div>
              <div className="item">大阳台</div>
              <div className="item">厨房</div>
              <div className="item">餐厅</div>
              <div className="item">主卧</div>
              <div className="item">过道</div>
            </div>
          </div>
        </div>

        <div>
          <div className="room_innertitle">天小翼的家</div>
          <div className="room_listouter">
            <div className="list">
              <div className="item">厨房</div>
              <div className="item">餐厅</div>
              <div className="item">主卧</div>
              <div className="item">过道</div>
              <div className="item">书桌</div>
              <div className="item">卧室</div>
              <div className="item">活动室</div>
              <div className="item">大阳台</div>
              <div className="item">厨房</div>
              <div className="item">餐厅</div>
              <div className="item">主卧</div>
              <div className="item">过道</div>
            </div>
          </div>
        </div>

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
