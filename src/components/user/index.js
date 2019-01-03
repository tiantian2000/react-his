/**
 * Created by Administrator on 2018/11/30.
 */
import React, { Component } from 'react';
import { List,Toast } from 'antd-mobile';
import {loadUser} from '../common/js/cache'
import PropTypes from 'prop-types';
import './style.less'

const Item = List.Item;
const Brief = Item.Brief;

class User extends Component {

    constructor(){
        super();
        this.state=({
            user: {

            }
        })
    }

    componentDidMount(){
        let user = loadUser()
        console.log(user)
        if(typeof(user.cardNo) === 'undefined'){
            user = {
                idenno: '',
                cardNo: '',
                name: '游客身份'
            }
        }
        this.setState({
                user
        })
    }

    go(_el){
        Toast.info('正在开发中...')
    }

    login(){
       if(this.state.user.idenno === ''){
           this.context.router.history.push('/login')
       }
    }

    render(){
        return(
            <div className="user">
                <div className="logo">
                    <div className="header">
                        <div className="icon">
                            <i className="icon-yonghu" onClick={this.login.bind(this)}></i>
                        </div>
                         <p className="title" onClick={this.login.bind(this)}>{this.state.user.name}</p>
                    </div>
                </div>
                <div class="content">
                    <div className="sub-title">
                        <div className="reserve">
                            <i className="icon-calendar"/>
                            <span className="icon-title" onClick={this.go.bind(this)}>我的预约</span>
                        </div>
                        <div className="hr"></div>
                        <div className="reserve">
                            <i className="icon-home"/>
                            <span className="icon-title" onClick={this.go.bind(this)}>我的家庭</span>
                        </div>
                    </div>
                    <div className="list">
                        <List className="my-list">
                           <Item
                                arrow="horizontal"
                                thumb={<i className="icon-profile"/> }
                                multipleLine
                                onClick={this.go.bind(this)}
                            >
                                完善信息
                            </Item>
                            <Item
                                arrow="horizontal"
                                thumb={<i className="icon-folder-plus" /> }
                                multipleLine
                                onClick={this.go.bind(this)}
                            >
                                就诊历史
                            </Item>
                            <Item
                                arrow="horizontal"
                                thumb={<i className="icon-cart1" />}
                                multipleLine
                                onClick={this.go.bind(this)}
                            >
                                我的快递
                            </Item>
                            <Item
                                arrow="horizontal"
                                thumb={<i className="icon-icon_kefu" /> }
                                multipleLine
                                onClick={this.go.bind(this)}
                            >
                                我的医生
                            </Item>
                            <Item
                                arrow="horizontal"
                                thumb={<i className="icon-pencil2"/> }
                                multipleLine
                                onClick={this.go.bind(this)}
                            >
                                帮助反馈
                            </Item>
                            <Item
                                arrow="horizontal"
                                thumb={<i className="icon-cog"/> }
                                multipleLine
                                onClick={this.go.bind(this)}
                            >
                                系统设置
                            </Item>
                        </List>
                    </div>
                </div>


            </div>

        )
    }
}
User.contextTypes = {
    router: PropTypes.object.isRequired
}
export default User;