import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import "./Curtain.less"
import curtainStore from "../../store/curtainStore";
import animations from 'create-keyframe-animation'

@inject("curtainStore","deviceStore")
@observer
class Curtain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            touch : {
                startX:null
            },
            percent:null,
            left: null
        };
    }
    _offset(offsetWidth) {
        this.refs.curtainLeft.style.transition = 'all 0s';
        this.refs.curtainRight.style.transition = 'all 0s';
        this.refs.curtainLeft.style.webkitTransition = 'all 0s';
        this.refs.curtainRight.style.webkitTransition = 'all 0s';

        this.refs.curtainLeft.style.width = `${offsetWidth}px`;
        this.refs.curtainRight.style.width = `${offsetWidth}px`;
    }

    _changeAnimNew(selector,animName,clientWidth) {
        let animation;
        if (animName === 'anim_close') {
            animation =`
               0%{
                   width: ${clientWidth}px
               }
               100% { width: 50% }
            `;
        } else {
                animation =`{
                0%{
                    width: ${clientWidth}px
                }
                100% { width: 5% }
                `;
        }
        animations.registerAnimation({
            name: 'move',
            animation,
            presets: {
              duration: 5000,
              easing: 'linear'
            }
        })
        animations.runAnimation(selector, 'move',function() {});    
    }

    /**
     * 
     * @param {*} selector DOM
     * @param {*} animName 要改变的动画名称 anim_open,anim_close
     * @param Number clientWidth
     */
    _changeAnim(selector, animName,clientWidth) {
        selector.style.animation = '';
        selector.style.webkitAnimation = '';

        let keyframes = this._findKeyframesRule(animName);
        // 删除已经存在的开始和结束帧
        keyframes.deleteRule("0%");
        keyframes.deleteRule("100%");


        
        // // 重新指定动画名字使之生效
        // selector.style.webkitAnimationName = animName;
        // selector.style.animationName = animName;

        // const ballRunKeyframes = this._getkeyframes(animName);
        // // deleteRule方法用来从当前样式表对象中删除指定的样式规则
        // ballRunKeyframes.styleSheet.deleteRule(animation.index);

        // //重新定义ball从定位在(20,30)的位置运动到(400,500) 的位置
        let runkeyframes;
        if (animName === 'anim_close') {
             runkeyframes =` @keyframes ball-run{
                0%{
                    width: ${clientWidth}px
                }
                100% { width: 50% }
            }`;
        } else {
             runkeyframes =` @keyframes ball-run{
                0%{
                    width: ${clientWidth}px
                }
                100% { width: 5% }
            }`;
        }
        // // insertRule方法用来给当前样式表插入新的样式规则.
        // ballRunKeyframes.styleSheet.insertRule(keyFrames, animation.index);
        // // selector.setAttribute('style','animaition: ball-run1 5s;');
        setTimeout(_=>{
            // 1ms后纠正animation的名称
            selector.setAttribute('style',`animaition: ball-run 5s 1 ease;`);
            selector.setAttribute('style',`-webkit-animation: ball-run 5s 1 ease;`);
        },1)
    }

    /**
     * 
     * @param {*} animName 
     */
    _findKeyframesRule(animName) {
        let rule;
        let styleSheets = document.styleSheets;
        for (let i = 0; i < styleSheets.length; ++i) {
            for (let x = 0; x < styleSheets[i].cssRules.length; ++x) {
                rule = styleSheets[i].cssRules[x];
                if (rule.name == animName && (rule.type== CSSRule.KEYFRAMES_RULE || styleSheets[i].cssRules[j].type == CSSRule.WEBKIT_KEYFRAMES_RULE )){
                    return rule;
                }
            }
  
        }
    }

    _getkeyframes(animName) {
        var animation = {};
        // 获取所有的style
        var ss = document.styleSheets;
        for (var i = 0; i < ss.length; ++i) {
        const item = ss[i];
        if (item.cssRules[0] && item.cssRules[0].name && item.cssRules[0].name === animName) {
            animation.cssRule = item.cssRules[0];
            animation.styleSheet = ss[i];
            animation.index = 0;
        }
        }
        return animation;
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
        console.log('****control device begin:*****' + cmdNum);
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
            },
            left:this.refs.curtainLeft.clientWidth
        });
       
    }
    curtainTouchMove = (leftOfRight,e) => {
        // 固定值，为窗帘一半的宽度
        const halfWidth = this.refs.curtainBody.clientWidth * 0.5;
        // 获取startX与鼠标当前值的差值
        let deltaX;
        if (leftOfRight === 'left') {
            deltaX = e.touches[0].pageX - this.state.touch.startX;
        } else {
            deltaX =this.state.touch.startX - e.touches[0].pageX;
        }
        // 得到offsetWidth
        const offsetWidth = Math.min(halfWidth, Math.max(0, this.state.left + deltaX))
        // 百分比
        const percent = offsetWidth / halfWidth;
        if (percent < 0) {
            return;
        }
        if (percent > 0.05 ) {
            this._offset(offsetWidth);
        } else {
            this.setHalfCurtainOffset(0.05);
        } 
        this.setState({
            percent:percent
        });
    }

    curtainTouchEnd = (leftOfRight,e) => {
        console.log('**********touch end:state:'+ this.state.percent * 100);
        this.setDeviceCmd(parseInt((1-this.state.percent) * 100).toString());
    }

    openCurtain = () => {
        // curtainStore.togglePlay();
        
        this.refs.curtainLeft.classList.remove('w_50');
        this.refs.curtainRight.classList.remove('w_50');

        this.refs.curtainLeft.style.webkitTransition = 'all 5s';
        this.refs.curtainRight.style.webkitTransition = 'all 5s';

        this.refs.curtainLeft.style.transition = 'all 5s';
        this.refs.curtainRight.style.transition = 'all 5s';

        // this.refs.curtainLeft.classList.remove('curtain_close');
        // this.refs.curtainRight.classList.remove('curtain_close');

        this.refs.curtainLeft.classList.remove('pause');
        this.refs.curtainRight.classList.remove('pause');


        // this._changeAnim(this.refs.curtainLeft,'anim_open',this.refs.curtainLeft.clientWidth);

        // this._changeAnim(this.refs.curtainRight,'anim_open',this.refs.curtainRight.clientWidth);

        // this.refs.curtainLeft.classList.add('curtain_open');
        // this.refs.curtainRight.classList.add('curtain_open');
        
        this._changeAnimNew(this.refs.curtainLeft,'anim_open',this.refs.curtainLeft.clientWidth);
        this._changeAnimNew(this.refs.curtainRight,'anim_open',this.refs.curtainRight.clientWidth);

        this.refs.curtainLeft.classList.add('w_5');
        this.refs.curtainRight.classList.add('w_5');

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

        this.refs.curtainLeft.classList.remove('w_50');
        this.refs.curtainRight.classList.remove('w_50');
        
        this.refs.curtainLeft.style.width = this.refs.curtainLeft.clientWidth + 'px';
        this.refs.curtainRight.style.width = this.refs.curtainRight.clientWidth + 'px';

        this.refs.curtainLeft.style.webkitTransition = 'all 0s';
        this.refs.curtainRight.style.webkitTransition = 'all 0s';

        this.refs.curtainLeft.style.transition = 'all 0s';
        this.refs.curtainRight.style.transition = 'all 0s';

       
        /**this.refs.curtainLeft.style.transition = 'none';
        this.refs.curtainRight.style.transition = 'none';*/

        // this.refs.curtainLeft.style.width = this.refs.curtainLeft.clientWidth + 'px';
        // this.refs.curtainRight.style.width =  this.refs.curtainRight.clientWidth + 'px';
        

        this.refs.curtainLeft.classList.add('pause');
        this.refs.curtainRight.classList.add('pause');

        // animations.unregisterAnimation('move')
        // this.refs.curtainLeft.style.animation = '';
        // this.refs.curtainRight.style.animation = ''

        // this.setState({
        //     touch: {
        //         startX:this.refs.curtainLeft.clientWidth
        //     }
        // });

        this.setDeviceCmd('999');
    }


    closeCurtain = () => {
        this.refs.curtainLeft.classList.remove('w_5');
        this.refs.curtainRight.classList.remove('w_5');

        this.refs.curtainLeft.style.webkitTransition = 'all 5s';
        this.refs.curtainRight.style.webkitTransition = 'all 5s';

        this.refs.curtainLeft.style.transition = 'all 5s';
        this.refs.curtainRight.style.transition = 'all 5s';

        // this.refs.curtainLeft.classList.remove('curtain_open');
        // this.refs.curtainRight.classList.remove('curtain_open');
        // curtainStore.togglePlay();

        this.refs.curtainLeft.classList.remove('pause');
        this.refs.curtainRight.classList.remove('pause');

        // this._changeAnim(this.refs.curtainLeft,'anim_close',this.refs.curtainLeft.clientWidth);

        // this._changeAnim(this.refs.curtainRight,'anim_close',this.refs.curtainRight.clientWidth);

        // this.refs.curtainLeft.classList.add('curtain_close');
        // this.refs.curtainRight.classList.add('curtain_close');

        this._changeAnimNew(this.refs.curtainLeft,'anim_close',this.refs.curtainLeft.clientWidth);
        this._changeAnimNew(this.refs.curtainRight,'anim_close',this.refs.curtainRight.clientWidth);

        this.refs.curtainLeft.classList.add('w_50');
        this.refs.curtainRight.classList.add('w_50');

        this.setDeviceCmd('0');
    }




    render() {
        const { percent} = this.props.curtainStore;
        const { MOTOR_POS = "0"} = this.props.deviceStore.currentStatus || {};
        console.log('*******curtain page ******** MOTOR_POS******' + MOTOR_POS);
        const widthPer = (100 - parseInt(MOTOR_POS,10)) * 0.5 + '%';
        return (
            <div className="curtain-block">
                <div className="curtain-header"></div>
                <div className="curtain-body" ref="curtainBody">
                    <div className={`curtain-left`} 
                    style={{width:`${widthPer}`,transition:`none`}}
                    ref="curtainLeft"
                    >
                        <div className="curtain-btn-leftWrapper"
                            onTouchStart={(e) => this.curtainTouchStart('left',e)}
                            onTouchMove={(e) => this.curtainTouchMove('left',e)}
                            onTouchEnd={(e) => this.curtainTouchEnd('left',e)}
                        >
                            <div className="curtain-btn curtain-btn-left"></div>
                        </div>
                    </div>
                    <div className={`curtain-right`}
                    style={{width:`${widthPer}`,transition:`none`}}
                    ref="curtainRight"
                    onTouchStart={(e) => this.curtainTouchStart('right',e)}
                    onTouchMove={(e) => this.curtainTouchMove('right',e)}
                    onTouchEnd={(e) => this.curtainTouchEnd('right',e)}
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
