/**
 * Created by Administrator on 2018/11/30.
 */
import React, { Component } from 'react';
import { NavBar,List } from 'antd-mobile';
import axios from 'axios'
import PropTypes from 'prop-types';
import {makeSimpleDate} from '../common/js/dateformat.js' //注意路径*/
import {host} from '../common/js/config'
import Header from '../header'
import './style.less'

const Item = List.Item;
const Brief = Item.Brief;

class Message extends Component {

    constructor(){
        super()
        this.state = {
            records: [],
        }
    }

    componentDidMount(){
        console.log('aaa')
        let path = `${host}/message/listAll`
        axios.get(path).then(res=>{
            this.setState({
                records: res.data
            })
        }).catch(error=>
            console.log(error)
        )
    }

    detail(index){
        let record = this.state.records[index]
        this.context.router.history.push(`/messageDetail/${record.id}`)
    }

    render(){
        let data = this.state.records.map((item,index)=>{
            return (<Item key={index}  multipleLine
                          extra={makeSimpleDate(item.operDate)} align="top"
                          thumb={<i className="icon-tongzhi" style={{fontSize:'26px',color:'rgba(238, 94, 35, 0.65)'}}/> }
                          onClick={this.detail.bind(this,index)} >
                {item.title} <Brief>{item.content}</Brief>
            </Item>)
        })
        return(
            <div className="message">
                <NavBar>消息</NavBar>
                <List className="my-list">
                    {data}
                </List>
            </div>
        )
    }
}

Message.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Message;