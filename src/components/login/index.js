/**
 * Created by Administrator on 2018/11/30.
 */
/**
 * Created by Administrator on 2018/11/30.
 */
import React, { Component } from 'react';
import { NavBar, Icon,InputItem,List,Button,Toast  } from 'antd-mobile';
import { createForm } from 'rc-form';
import axios from 'axios'
import {host} from '../common/js/config'
import {saveUser} from '../common/js/cache'
import Header from '../header'
import './style.less'
import '../../static/css/style.css'

const Item = List.Item;
class Login extends Component {

    onSubmit = () => {
        this.props.form.validateFields({ force: true }, (error) => {
            if (!error) {
                console.log(this.props.form.getFieldsValue());
                axios.get(`${host}/patientinfo/get/${this.props.form.getFieldsValue().cardNo}`)
                    .then(res=>{
                        let user = res.data
                        console.log(user)
                        if(typeof(user.cardNo) === 'undefined'){
                            Toast.offline('就诊卡号不存在')
                        }else if(user.idenno !== this.props.form.getFieldsValue().idenno){
                            Toast.offline('身份证号不存在')
                        }else{
                            Toast.success('登录成功')
                            saveUser(res.data)
                            this.props.history.push('/')
                        }
                    })
            } else {
                //alert('Validation failed');
            }
        });
    }

    back(){
        this.props.history.push('/')
    }

    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        return(
            <div className="login">
                <NavBar
                    mode="dark"
                    leftContent={<Icon type="left" size="lg" onClick={this.back.bind(this)}/>}
                >登录</NavBar>
                <div className="icon">
                    <img className="img" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGMTZENkE7fQoJLnN0MXtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPjxnPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00ODguNSwyNTZjMCwxMjguNC0xMDQuMSwyMzIuNS0yMzIuNSwyMzIuNVMyMy41LDM4NC40LDIzLjUsMjU2QzIzLjUsMTI3LjYsMTI3LjYsMjMuNSwyNTYsMjMuNSAgIFM0ODguNSwxMjcuNiw0ODguNSwyNTZ6Ii8+PGc+PHBhdGggY2xhc3M9InN0MSIgZD0iTTI2NS42LDM0OC4zYy0zLDAtNS43LTItNi42LTQuOGwtOS4xLTMwLjljLTIuNy05LjItMTEuNC0xNS43LTIxLjEtMTUuN2MtMS45LDAtMy45LDAuMy01LjcsMC43bC0yOC44LDguMSAgICBjLTAuNSwwLjEtMSwwLjItMS42LDAuMmMtMi44LDAtNS4yLTEuOS01LjktNC42bC0zMC40LTExNC40Yy0wLjktMy40LDEuMS02LjksNC41LTcuOGw1LjEtMS4zbDIuNSw5LjVsMTI0LTMyLjlsLTIuNS05LjVsOC45LTIuNCAgICBjMC42LTAuMSwxLjEtMC4yLDEuNy0wLjJjMi45LDAsNS40LDEuOSw2LjIsNC44bDQ1LjYsMTcxLjljMC41LDEuNiwwLjIsMy40LTAuNiw0LjljLTAuOSwxLjUtMi4zLDIuNS0zLjksMi45TDI2Ny4zLDM0OCAgICBDMjY2LjcsMzQ4LjIsMjY2LjEsMzQ4LjMsMjY1LjYsMzQ4LjNMMjY1LjYsMzQ4LjN6IE0yNDcuNSwyODkuNWwzMS43LTguNGwtNy43LTI5bDI5LTcuN2wtOC40LTMxLjdsLTI5LDcuN2wtNy43LTI5bC0zMS43LDguNCAgICBsNy43LDI5bC0yOSw3LjdsOC40LDMxLjdsMjktNy43TDI0Ny41LDI4OS41eiIvPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zODcuMywzMjcuNmwtNTEuOC0xOTUuM2MtMy40LTEyLjctMTYuOS0yMC4zLTMwLTE2LjhsLTIyLjEsNS45djBsLTEwLjIsMi43bC0wLjMtMS4yICAgIGMtMS43LTYuMi04LjEtOS45LTE0LjMtOC4zbC0xOS41LDUuMmMtMi45LTcuNS0xNi4xLTEwLjUtMjQuMS04LjRjLTgsMi4xLTE3LjksMTEuMi0xNi44LDE5LjJsLTE5LjQsNS4yICAgIGMtNi4yLDEuNi05LjksOC4xLTguMywxNC4zbDAuMywxLjFsLTcuOSwyLjF2MGwtNC45LDEuM2wwLDBsMCwwbC0xNS42LDQuMmMtMTMuMSwzLjQtMjEuMSwxNi43LTE3LjcsMjkuNWw1MS44LDE5NS4zICAgIGMzLjQsMTIuOCwxNi45LDIwLjQsMzAsMTYuOWwxNjMuMS00My4zQzM4Mi43LDM1My43LDM5MC42LDM0MC40LDM4Ny4zLDMyNy42eiBNMjE2LjcsMTE5YzQuNy0xLjIsOS40LDEuNSwxMC42LDYuMiAgICBjMS4zLDQuNi0xLjUsOS40LTYuMSwxMC42Yy00LjYsMS4yLTkuNC0xLjUtMTAuNi02LjJDMjA5LjMsMTI1LDIxMi4xLDEyMC4yLDIxNi43LDExOXogTTI0NC43LDM1MS42TDI0NC43LDM1MS42ICAgIGMwLDAsMC4xLDAuMSwwLjIsMC4xTDI0NC43LDM1MS42eiBNMzUwLjksMzM4LjJsLTgwLjYsMjEuNGMtOS43LDIuNi0xOS45LTMuMS0yMi44LTEyLjhsLTkuMS0zMC45Yy0xLjUtNS4xLTYuOS04LjItMTIuMS02LjggICAgbC0yOC43LDguMWMtOS45LDIuNi0xOS45LTMuMS0yMi40LTEyLjhsLTMwLjQtMTE0LjRjLTIuNi05LjgsMy4zLTE5LjksMTMtMjIuNWw4LjMtMi4ybDAsMGw3LjktMi4xbDIuOCwxMC41bDEwMi40LTI3LjIgICAgbC0yLjgtMTAuNWw5LjktMi42bDkuNi0yLjVjOS44LTIuNiwxOS44LDMuMiwyMi40LDEzbDQ1LjYsMTcyQzM2Ni41LDMyNS42LDM2MC43LDMzNS42LDM1MC45LDMzOC4yeiIvPjwvZz48L2c+PC9zdmc+"/>
                    <div className="title">社区医疗助手</div>
                    <div className="sub">community health care assistant</div>
                </div>
                <div class="form">
                    <form>
                        <List

                            renderFooter={() => {
                                if(getFieldError('cardNo')){
                                    return getFieldError('cardNo').join(',')
                                }
                                if(getFieldError('idenno')){
                                    return getFieldError('idenno').join(',')
                                }
                            }}
                        >
                            <InputItem
                                {...getFieldProps('cardNo', {
                                    // initialValue: 'little ant',
                                    rules: [
                                        { required: true, message: '请输入就诊卡号' },
                                        {validator(rule, value, callback, source, options){
                                            var errors = [];
                                            console.log(value,"Xx")
                                            if(value && value.length!=10){
                                                callback("请输入10位就诊卡号");
                                            }
                                            callback()

                                        }},
                                    ],
                                })}
                                clear
                                error={!!getFieldError('cardNo')}
                                onErrorClick={() => {
                                    alert(getFieldError('cardNo').join('、'));
                                }}
                                placeholder="请输入就诊卡号"
                            >
                                <i className="icon-mail-envelope" style={{fontSize:'26px'}}/>
                            </InputItem>
                            <InputItem {...getFieldProps('idenno',
                                       {
                                           rules:[
                                               { required: true, message: '请输入身份证号' },
                                               {validator(rule, value, callback, source, options){
                                                   var re = /^[1-9]\d{7}((0[1-9])|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                                                   if(typeof(value)==="undefined") callback()
                                                   if (re.test(value)) {
                                                       callback();
                                                   } else {
                                                       callback('请输入正确的身份证号');
                                                   }
                                               }}
                                           ]
                                       })} placeholder="请输入身份证号" clear>
                                <i className="icon-key" style={{fontSize:'26px'}}/>
                            </InputItem>

                            <Item>
                                <Button type="primary"  inline onClick={this.onSubmit}>立即登录</Button>
                            </Item>
                        </List>
                    </form>
                </div>
            </div>
        )
    }
}

const WrappedForm = createForm()(Login);
export default WrappedForm;