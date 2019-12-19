import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import "./Curtain.less"

@inject("curtainStore")
@observer
class Curtain extends Component {
    constructor() {
        super();
        this.state = {
            touch : {
                startX:null
            }
        };
    }
    _offset(offsetWidth) {
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
 
    componentDidMount() {
        this.props.curtainStore.getPercent();
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
        if (deltaX > 50) {
            this._offset(Math.min(deltaX,halfWidth));
        } else {
            this.setHalfCurtainOffset(0.05);
        } 
    }

    curtainTouchEnd = (leftOfRight,e) => {
        console.log("touchend");
    }




    render() {
        const { percent } = this.props.curtainStore;
        return (
            <div className="curtain-block">
                <div className="curtain-header"></div>
                <div className="curtain-body" ref="curtainBody">
                    <div className="curtain-left" ref="curtainLeft"
                        onTouchStart={(e) => this.curtainTouchStart('left',e)}
                        onTouchMove={(e) => this.curtainTouchMove('left',e)}
                        onTouchEnd={(e) => this.curtainTouchEnd('left',e)}
                    ></div>
                    <div className="curtain-right" ref="curtainRight"
                        onTouchStart={(e) => this.curtainTouchStart('left',e)}
                        onTouchMove={(e) => this.curtainTouchMove('left',e)}
                        onTouchEnd={(e) => this.curtainTouchEnd('left',e)}
                    ></div>
                </div>
            </div>
        );
    }
}

export default Curtain;
