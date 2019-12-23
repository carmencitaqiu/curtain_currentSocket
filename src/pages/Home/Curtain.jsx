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
        deviceStore.controlDevice(
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
              deviceStore.deviceStatus
                .filter(d => d.serialId == curSerialId)[0]
                .deviceStatusSerial.forEach(d => {
                //   if (d.statusName === "MOTOR_POS") {
                //     d.curStatusValue = "0";
                //   }
                });
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
        curtainStore.togglePlay();
        this.refs.curtainLeft.classList.remove('w_50');
        this.refs.curtainRight.classList.remove('w_50');

        this.refs.curtainLeft.classList.add('w_5');
        this.refs.curtainRight.classList.add('w_5');

        this.refs.curtainLeft.classList.remove('curtain_close');
        this.refs.curtainRight.classList.remove('curtain_close');

        this.refs.curtainLeft.classList.remove('pause');
        this.refs.curtainRight.classList.remove('pause');

        this.refs.curtainLeft.classList.add('curtain_open');
        this.refs.curtainRight.classList.add('curtain_open');

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
        // console.log('*****clientWidth:' + this.refs.curtainLeft.clientWidth);
        // this.refs.curtainLeft.style.width = this.refs.curtainLeft.clientWidth + 'px';

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
                        <div className="curtain-btn curtain-btn-left"
                        onTouchStart={(e) => this.curtainTouchStart('left',e)}
                        onTouchMove={(e) => this.curtainTouchMove('left',e)}
                        onTouchEnd={(e) => this.curtainTouchEnd('left',e)}
                        ></div>
                    </div>
                    <div className={`curtain-right ${MOTOR_POS === '100' ? 'w_5':'w_50'}`} ref="curtainRight"
                    >
                        <div className="curtain-btn curtain-btn-right" 
                        onTouchStart={(e) => this.curtainTouchStart('left',e)}
                        onTouchMove={(e) => this.curtainTouchMove('left',e)}
                        onTouchEnd={(e) => this.curtainTouchEnd('left',e)}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Curtain;
