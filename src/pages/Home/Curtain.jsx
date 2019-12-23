import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import "./Curtain.less"
import curtainStore from "../../store/curtainStore";

@inject("curtainStore","deviceStore")
@observer
class Curtain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            touch : {
                startX:null
            }
        };
    }
    _offset(offsetWidth) {
        this.refs.curtainLeft.style.transition = 'width 0s';
        this.refs.curtainRight.style.transition = 'width 0s';
        this.refs.curtainLeft.style.width = `${offsetWidth}px`;
        this.refs.curtainRight.style.width = `${offsetWidth}px`;
    }

    /**
     * 
     * @param {*} selector DOM
     * @param {*} animName 要改变的动画名称 anim_open,anim_close
     * @param Number clientWidth
     */
    _changeAnim(selector, animName,clientWidth) {
        let keyframes = this._findKeyframesRule(animName);
        // 删除已经存在的开始和结束帧
        keyframes.deleteRule("from");
        keyframes.deleteRule("to");

        keyframes.appendRule("from { width:"+ clientWidth + "px !important;}");

        keyframes.appendRule("to { width: 100% }");
        // 重新指定动画名字使之生效
        // selector.style.webkitAnimationName = animName;
    }

    /**
     * 
     * @param {*} animName 
     */
    _findKeyframesRule(animName) {
        let rule;
        let styleSheets = document.styleSheets;
        for (let i = 0; i < styleSheets.length; ++i) {
            for (var x = 0; x < styleSheets[i].cssRules.length; ++x) {
                rule = styleSheets[i].cssRules[x];
                if (rule.name == animName && (rule.type== CSSRule.KEYFRAMES_RULE || styleSheets[i].cssRules[j].type == CSSRule.WEBKIT_KEYFRAMES_RULE )){
                    return rule;
                }
            }
  
        }
    }

    setHalfCurtainOffset(percent) {
        if (percent >= 0) {
            const halfWidth = this.refs.curtainBody.clientWidth * 0.49;
            const offsetWidth = percent * halfWidth;
            const targetWidth = Math.min(halfWidth,offsetWidth);
            this._offset(targetWidth);
        }
    }

    /**
     * 发设备指令
     */
    setDeviceCmd(cmdNum) {
        const { deviceStore } = this.props;
        const { deviceId, curSerialId } = deviceStore;
        // NOTE 执行设备控制具体的操作
        curtainStore.controlDevice(
            {
              deviceId,
              serialId: curSerialId,
              actionCmdSerial: [
                {
                  cmdName: "SET_MOTOR_POS",
                  cmdParam: cmdNum
                }
              ]
            },
            () => {
              //强制刷新
              deviceStore.setState({
                deviceChangeed: deviceStore.deviceChangeed + 1
              });
            }
          );
    }
 
    componentDidMount() {
        this.props.curtainStore.getPercent();
        this.props.onRef && this.props.onRef(this);
    }

    
    curtainTouchStart = (leftOfRight,e) => {
        this.setState({
            touch: {
                startX:e.touches[0].pageX
            }
        });

    }
    curtainTouchMove = (leftOfRight,e) => {
        const halfWidth = this.refs.curtainBody.clientWidth * 0.49;
        const deltaX = e.touches[0].pageX - this.state.touch.startX;
        const percent = deltaX / halfWidth;
        if (percent > 0.05 ) {
            this._offset(Math.min(deltaX,halfWidth));
        } else {
            this.setHalfCurtainOffset(0.05);
        } 
    }

    curtainTouchEnd = (leftOfRight,e) => {
    }

    openCurtain = () => {
        // curtainStore.togglePlay();

        // this.refs.curtainLeft.classList.remove('w_50');
        // this.refs.curtainRight.classList.remove('w_50');

        // this.refs.curtainLeft.classList.add('w_5');
        // this.refs.curtainRight.classList.add('w_5');

        this.refs.curtainLeft.classList.remove('curtain_close');
        this.refs.curtainRight.classList.remove('curtain_close');

        this.refs.curtainLeft.classList.remove('pause');
        this.refs.curtainRight.classList.remove('pause');

        this.refs.curtainLeft.classList.add('curtain_open');
        this.refs.curtainRight.classList.add('curtain_open');

        // this.refs.curtainLeft.style.webkitAnimationName = 'anim_open';
        // this.refs.curtainRight.style.webkitAnimationName = 'anim_open';
        this.setDeviceCmd('100');
    }

    suspend = () => {
        // this.refs.curtainLeft.classList.remove('curtain_open');
        // this.refs.curtainRight.classList.remove('curtain_open');

        // curtainStore.togglePlay();        
        // this.refs.curtainLeft.classList.remove('curtain_close');
        // this.refs.curtainRight.classList.remove('curtain_close');

        this.refs.curtainLeft.classList.remove('w_5');
        this.refs.curtainRight.classList.remove('w_5');

        this.refs.curtainLeft.classList.add('pause');
        this.refs.curtainRight.classList.add('pause');

        this.setState({
            touch: {
                startX:this.refs.curtainLeft.clientWidth
            }
        });
        // this._changeAnim(this.refs.curtainLeft,'anim_close',this.refs.curtainLeft.clientWidth);

        this.setDeviceCmd('999');
    }


    closeCurtain = () => {
        this.refs.curtainLeft.classList.remove('w_5');
        this.refs.curtainRight.classList.remove('w_5');

        this.refs.curtainLeft.classList.add('w_50');
        this.refs.curtainRight.classList.add('w_50');
        this.refs.curtainLeft.classList.remove('curtain_open');
        this.refs.curtainRight.classList.remove('curtain_open');
        curtainStore.togglePlay();

        this.refs.curtainLeft.classList.remove('pause');
        this.refs.curtainRight.classList.remove('pause');

        this.refs.curtainLeft.classList.add('curtain_close');
        this.refs.curtainRight.classList.add('curtain_close');

        // this.refs.curtainLeft.style.webkitAnimation = 'anim_close 10s';
        // this.refs.curtainRight.style.webkitAnimation = 'anim_close 10s';

        this.setDeviceCmd('0');
    }




    render() {
        const { percent} = this.props.curtainStore;
        const { MOTOR_POS = "0"} = this.props.deviceStore.currentStatus || {};
        return (
            <div className="curtain-block">
                <div className="curtain-header"></div>
                <div className="curtain-body" ref="curtainBody">
                    <div className={`curtain-left ${MOTOR_POS === '100' ? 'w_5':'w_50'}`} ref="curtainLeft"
                    >
                        <div className="curtain-btn-leftWrapper"
                            onTouchStart={(e) => this.curtainTouchStart('left',e)}
                            onTouchMove={(e) => this.curtainTouchMove('left',e)}
                            onTouchEnd={(e) => this.curtainTouchEnd('left',e)}
                        >
                            <div className="curtain-btn curtain-btn-left"></div>
                        </div>
                    </div>
                    <div className={`curtain-right ${MOTOR_POS === '100' ? 'w_5':'w_50'}`} ref="curtainRight"
                    onTouchStart={(e) => this.curtainTouchStart('left',e)}
                    onTouchMove={(e) => this.curtainTouchMove('left',e)}
                    onTouchEnd={(e) => this.curtainTouchEnd('left',e)}
                    >
                        
                        <div className="curtain-btn-rightWrapper">
                            <div className="curtain-btn curtain-btn-right"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Curtain;
