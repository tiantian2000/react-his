/**
 * Created by Administrator on 2018/12/1.
 */
import React, { Component } from 'react';
import { ActivityIndicator,NavBar, Icon,List  } from 'antd-mobile';
import {loadUser} from '../common/js/cache'
import axios from 'axios'
import Scroll from 'react-bscroll'
import {host} from '../common/js/config'
import {makeSimpleDate} from '../common/js/dateformat.js' //注意路径*/
import 'react-bscroll/lib/react-scroll.css'
import "./style.less"

const Item = List.Item;
const Brief = Item.Brief;

class InHospital extends Component {

    constructor(){
        super()
        this.state = {
            user: {},
            records: [],
            pages: 0,
            page: 1,
            error: null,
            isLoaded: false,
            hasMore: true, //还有没有更多数据
            isLoadingMore: false //是加载中还是加载更多
        }
    }

    componentDidMount(){
       this.setState({
           user:loadUser()
       },()=>{
           this.setPage()
       })

    }

    //加载数据
    setPage() {
        let path = `${host}/inHospital/mobileList/${this.state.page}`
        axios.post(path,this.state.user).then(res=>{
            let data = res.data
            console.log(data)
            this.setState({
                pages: res.data.pages,
                records: this.state.records.concat(data.list),
                isLoaded: true
            })
            console.log(this.state.records)
        }).catch(error=>
            this.setState({
                isLoaded: true,
                error
            }))
    }

    loadMoreData() {
        if(this.state.page<this.state.pages){
            this.setState({
                    page: this.state.page + 1
                }, () => {
                    this.setPage()
                }
            )
        }
    }

    back(){
        this.props.history.push('/')
    }

    detail(index){
        let record = this.state.records[index]
        let data = JSON.stringify(record);
        //console.log(data)
        this.props.history.push(`/inHospitalDetail/${data}`)
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
    render(){

        let data
        const {error,isLoaded,records} = this.state
        if(error){
            data = <div>加载失败... </div>
        }else if(!isLoaded){
            data = <ActivityIndicator text="Loading..."/>
        }else{
            data = records.map((item,index)=>{
                return (<Item key={index}  multipleLine
                              extra={makeSimpleDate(item.inDate)} align="top"
                              thumb={<i className="icon-folder-plus" style={{fontSize:'26px',color:'rgba(238, 94, 35, 0.65)'}}/> }
                              onClick={this.detail.bind(this,index)}>
                    病床号:{item.bed.bedNo} <Brief><span className="state">{this.formatInState(item.inState)}</span>
                    费用: <span className="total">{item.totCost?item.totCost:'0'} </span>元 </Brief>
                </Item>)
            })
        }

        return(
            <div className="in-hospital">
                <NavBar
                    mode="dark"
                    leftContent={<Icon type="left" size="lg" onClick={this.back.bind(this)}/>}
                >住院信息</NavBar>
                <Scroll click={true} pullUpLoad={true} pullUpLoadMoreData={this.loadMoreData.bind(this)}>
                    <List renderHeader={() => `姓名:${this.state.user.name}`} className="my-list">
                        {data}
                    </List>
                </Scroll>
            </div>

        )
    }
}

export default InHospital;