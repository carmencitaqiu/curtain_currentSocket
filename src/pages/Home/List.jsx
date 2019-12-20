import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import {Link} from 'react-router-dom';


@inject("gatewayStore","curtainStore")
@withRouter
@observer
class List extends Component {

  constructor(props) {
    super(props);
  }
  

  render() {
    const { percent, playIcon,isPlaying } = this.props.curtainStore;
    return (
      <div className="Controller">

          <div className={"switch-box"} onClick={this.props.openCurtain}>
            <i className="timing-img" />
            <span>打开窗帘</span>
          </div>


          <div className={"switch-box"} onClick={this.props.suspend}>
            <i className={`${playIcon}`} />
              <span>{isPlaying ? '暂停' : '开始'}</span>
          </div>

          <div className={"switch-box"} onClick={this.props.closeCurtain}>
            <i className="electric-img" />
            <span>关闭窗帘</span>
          </div>
      </div>
    );
  }
}
export default List;