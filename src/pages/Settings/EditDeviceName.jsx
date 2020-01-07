import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import MainPage from "../../comm/MainPage";
import "./index.less";
import { List, InputItem, Button } from "antd-mobile";
const Item = List.Item;

const list = [
    { name: "电灯", id: 1 },
    { name: "电扇", id: 2 },
    { name: "台灯", id: 3 },
    { name: "插座", id: 4 },
    { name: "吊灯", id: 5 },
    { name: "灯带", id: 6 },
    { name: "落地灯", id: 7 },
    { name: "玄关灯", id: 8 }
];

@inject("deviceStore")
@withRouter
@observer
class EditDeviceName extends Component {
    state = {
        value: "",
        active: ""
    };
    componentDidMount() {
        setTimeout(() => {
            const { name } = this.props.deviceStore;
            this.setState({ value: name });
        }, 500);
    }
    //表单change
    onChange = val => {
        // console.log(val);
        this.setState({ value: val });
    };
    //确认,提交表单
    confirm = () => {
        const val = this.state.value;
        const { deviceStore, history } = this.props;
        if (!val) {
            deviceStore.toastString("请输入设备名称");
        } else {
            history.goBack();
            deviceStore.setDeviceName(val);
        }
    };
    //设置推荐名称
    setActive = id => {
        this.setState({ active: id });
        list.forEach((item, idx) => {
            if (item.id === id) {
                this.setState({ value: item.name });
            }
        });
    };
    //跳转到设置开关名称页面
    goSetName = id => {
        // console.log(id);
        this.props.history.push("/SetName");
    };
    render() {
        const items = list.map((item, idx) => (
            <div
                className={`item${item.id === this.state.active ? " active" : ""}`}
                key={item.id}
                onClick={this.setActive.bind(this, item.id)}
            >
                {item.name}
            </div>
        ));
        return (
            <MainPage>
                <div className="top">
                    <div className="top-name device-name">
                        <div className="title">设备名称</div>
                    </div>
                </div>
                <div className="inner device-name-info">
                    <div className="wrap devicename">
                        <div className="input-name">
                            <div className="label">设备名称</div>
                            <List>
                                <InputItem
                                    clear
                                    value={this.state.value}
                                    placeholder="请输入开关名称"
                                    onChange={this.onChange}
                                ></InputItem>
                            </List>
                            <div className="tips">请设置简洁的名称，以便显示和语言操作</div>
                        </div>
                        <div className="suggest-name">
                            <div className="title">推荐名称</div>
                            <div className="list">{items}</div>
                        </div>
                        <Button type="primary" className="save" onClick={this.confirm}>
                            保存
                        </Button>
                    </div>
                </div>
            </MainPage>
        );
    }
}
export default EditDeviceName;
