import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import "./Curtain.less"
import curtainStore from "../../store/curtainStore";

@inject("curtainStore")
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
        if (deltaX > 50) {
            this._offset(Math.min(deltaX,halfWidth));
        } else {
            this.setHalfCurtainOffset(0.05);
        } 
    }

    curtainTouchEnd = (leftOfRight,e) => {
        console.log("touchend");
    }

    openCurtain = () => {
        this.refs.curtainLeft.classList.remove('curtain_close');
        this.refs.curtainRight.classList.remove('curtain_close');

        curtainStore.togglePlay();
        // this.refs.curtainLeft.classList.add('curtain_open');
        // this.refs.curtainRight.classList.add('curtain_open');
        
    }

    suspend = () => {
        // this.refs.curtainLeft.classList.remove('curtain_open');
        // this.refs.curtainRight.classList.remove('curtain_open');

        curtainStore.togglePlay();        
        this.refs.curtainLeft.classList.remove('curtain_close');
        this.refs.curtainRight.classList.remove('curtain_close');
    }


    closeCurtain = () => {
        // this.refs.curtainLeft.classList.remove('curtain_open');
        // this.refs.curtainRight.classList.remove('curtain_open');
        curtainStore.togglePlay();
        this.refs.curtainLeft.classList.add('curtain_close');
        this.refs.curtainRight.classList.add('curtain_close');
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
