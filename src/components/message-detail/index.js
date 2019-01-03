/**
 * Created by Administrator on 2018/12/2.
 */
import React, { Component } from 'react';
import { NavBar,Icon,Card,List,Flex } from 'antd-mobile';
import {makeSimpleDate,dateDiff,makeDate} from '../common/js/dateformat.js' //注意路径*/
import {host} from '../common/js/config'
import axios from 'axios'
import './style.less'

const Item = List.Item;
const Brief = Item.Brief;
class InHospitalDetail extends Component {

    constructor(){
        super()
        this.state = {
            record:{}
        }

    }

    componentDidMount(){
        let id = this.props.match.params.id
        let path = `${host}/message/get/${id}`
        axios.get(path).then(res=>{
            this.setState({
                record: res.data
            })
        }).catch(error=>
            console.log(error)
        )
    }

    back(){
        this.props.history.push('/main/greenTab')
    }

    render(){
        return(
            <div className="message-detail">
                <NavBar
                    mode="dark"
                    leftContent={<Icon type="left" size="lg" onClick={this.back.bind(this)}/>}
                >消息明细</NavBar>
                <Card>
                    <Card.Header
                        title={this.state.record.title}
                        thumb={<i className="icon-tongzhi" style={{paddingRight:'5px',fontSize:'28px',color:'rgba(238, 94, 35, 0.65)'}}/> }

                    />
                    <Card.Body>
                        <div className="title">{this.state.record.content}</div>
                    </Card.Body>
                    <Card.Footer  extra={`${makeDate(this.state.record.operDate)}`}/>
                </Card>

            </div>
        )
    }
}

export default InHospitalDetail;