/**
 * Created by Administrator on 2018/12/2.
 */
/**
 * Created by Administrator on 2018/11/30.
 */
/**
 * Created by Administrator on 2018/11/30.
 */
import React, { Component } from 'react';
import { NavBar,Icon,Card,List,Flex } from 'antd-mobile';
import {makeSimpleDate,dateDiff} from '../common/js/dateformat.js' //注意路径*/
import './style.less'

const Item = List.Item;
const Brief = Item.Brief;
class InHospitalDetail extends Component {

    constructor(){
        super()
        this.state = {
            record: {
                bed:{},
            }
        }

    }

    componentDidMount(){
        let day;
        let record = JSON.parse(this.props.match.params.data)
        if(typeof (record.outDate) !== 'string'){
            day = dateDiff(makeSimpleDate(new Date()),makeSimpleDate(record.inDate));
            record.totCost = day * record.bed.cost
        }else{
            day = dateDiff(makeSimpleDate(record.outDate),makeSimpleDate(record.inDate));
        }
        record.day = day
        record.cost = day * record.bed.cost
        this.setState({
            record
        })
    }
    formatInState(inState){
        let res = ''
        switch(inState){
            case '0':
                res = '住院登记'
                break;
            case '1':
                res = '病房接诊'
                break;
            case '2':
                res = '出院登记'
                break;
            case '3':
                res = '出院结算'
                break;
            case '4':
                res = '无费退院'
                break;
        }
        return res
    }

    formatInSource(inSource){
        let res = ''
        switch(inSource){
            case '1':
                res = '门诊'
                break;
            case '2':
                res = '急诊'
                break;
            case '3':
                res = '转科'
                break;
            case '4':
                res = '转院'
                break;
        }
        return res
    }

    formatPaykindCode(paykindCode){
        let res = ''
        switch(paykindCode){
            case '1':
                res = '自费'
                break;
            case '2':
                res = '保险'
                break;
            case '3':
                res = '公费在职'
                break;
            case '4':
                res = '公费退休'
                break;
            case '5':
                res = '公费高干'
                break;
        }
        return res
    }

    back(){
        this.props.history.push('/inHospital')
    }

    render(){
        return(
            <div className="in-hospital-detail">
                <NavBar
                    mode="dark"
                    leftContent={<Icon type="left" size="lg" onClick={this.back.bind(this)}/>}
                >住院明细</NavBar>
                <Card>
                    <Card.Header
                        title={this.formatInState(this.state.record.inState)}
                        thumb={<i className="icon-folder-plus" style={{paddingRight:'5px',fontSize:'28px',color:'rgba(238, 94, 35, 0.65)'}}/> }
                        extra={`${makeSimpleDate(this.state.record.inDate)}入院`}
                    />
                    <Card.Body>
                        <div className="title">{this.state.record.name}</div>
                    </Card.Body>
                </Card>
                <List className="my-list">
                    <Item>
                        <Flex>
                            <Flex.Item>就诊卡号</Flex.Item>
                            <Flex.Item>{this.state.record.cardNo}</Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <Flex>
                            <Flex.Item>科室</Flex.Item>
                            <Flex.Item>{this.state.record.deptName}</Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <Flex>
                            <Flex.Item>入院来源</Flex.Item>
                            <Flex.Item>{this.formatInSource(this.state.record.inSource)}</Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <Flex>
                            <Flex.Item>结算类别</Flex.Item>
                            <Flex.Item>{this.formatPaykindCode(this.state.record.paykindCode)}</Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <Flex>
                            <Flex.Item>床位号</Flex.Item>
                            <Flex.Item>{this.state.record.bed.bedNo}</Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <Flex>
                            <Flex.Item>床位费/天</Flex.Item>
                            <Flex.Item>{this.state.record.bed.cost}元</Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <Flex>
                            <Flex.Item>出院日期</Flex.Item>
                            <Flex.Item>{typeof(this.state.record.outDate)==='string'?makeSimpleDate(this.state.record.outDate):''}</Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <Flex>
                            <Flex.Item>住宿天数</Flex.Item>
                            <Flex.Item>{this.state.record.day}</Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <Flex>
                            <Flex.Item>住宿费</Flex.Item>
                            <Flex.Item>{this.state.record.cost}</Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <Flex>
                            <Flex.Item>药品及其它费用</Flex.Item>
                            <Flex.Item>{this.state.record.totCost-this.state.record.cost}</Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <Flex>
                            <Flex.Item>费用总金额</Flex.Item>
                            <Flex.Item>{this.state.record.totCost}</Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <Flex>
                            <Flex.Item>预交金额</Flex.Item>
                            <Flex.Item>{this.state.record.prepayCost}</Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <Flex>
                            <Flex.Item>补交金额</Flex.Item>
                            <Flex.Item>{this.state.record.totCost-this.state.record.prepayCost>0?
                                this.state.record.totCost-this.state.record.prepayCost:0}</Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <Flex>
                            <Flex.Item>退还金额</Flex.Item>
                            <Flex.Item>{this.state.record.prepayCost-this.state.record.totCost>0?
                                this.state.record.prepayCost-this.state.record.totCost:0}</Flex.Item>
                        </Flex>
                    </Item>
                </List>
            </div>
        )
    }
}

export default InHospitalDetail;