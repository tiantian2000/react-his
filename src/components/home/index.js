/**
 * Created by Administrator on 2018/11/30.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid} from 'antd-mobile';
import {loadUser,delAllItemHistory} from '../common/js/cache'
import Header from '../header'
import Slide from '../slide'
import './style.less'

const data = [
    {
        icon: 'https://static.jk.cn/T1xJJCBmAT1RCvBVdK.png?img=/tf,d_webp,q_70',
        text: '智能导诊',
    },
    {
        icon:'https://wy.guahao.com/dist/icon-find-doctor.d8db2cd7f04951e624f8a9854b230017.png',
        text:'报告查询'
    },
    {
        icon: 'data:image/png;base64,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',
        text: '住院信息',
    },
    {
        icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQUM1MEY3OUZGNzYxMUU3ODg2RkUwMDdFMkFCNzg4MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowQUM1MEY3QUZGNzYxMUU3ODg2RkUwMDdFMkFCNzg4MyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBBQzUwRjc3RkY3NjExRTc4ODZGRTAwN0UyQUI3ODgzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBBQzUwRjc4RkY3NjExRTc4ODZGRTAwN0UyQUI3ODgzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+7VhOtwAAGoVJREFUeNrsXXuQ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',
        text:'健康商城'
    },
    {
        icon: 'https://static.jk.cn/T1mOLCBCK_1RCvBVdK.png?img=/tf,d_webp,q_70',
        text: '健康资讯',
    },
    {
        icon: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg',
        text: '费用支付',
    }
];

const data1 =[
    {
        icon: 'https://static.jk.cn/T1HjZ4BvYT1RCvBVdK.png?img=/tf,d_webp,q_70',
        title:'预约挂号',
        sub:'随时随地 预约医生'
    },
    {
        icon: 'https://static.jk.cn/T12OWCByV_1RCvBVdK.png?img=/tf,d_webp,q_70',
        title:'云诊室',
        sub:'足不出户 在线问诊'
    },
    {
        icon: 'https://static.jk.cn/T1mLZ4B4JT1RCvBVdK.png?img=/tf,d_webp,q_70',
        title:'远程会诊',
        sub:'国际国内 远程会诊'
    }

];
class Home extends Component {

    constructor(){
        super()
        this.state={
            banner: [

            ],
        }
    }

    componentDidMount(){
       //delAllItemHistory()
       let arr = [
           {
               'imgurl':'http://www.njglyy.com/images/banner5.jpg'
           },
           {
               'imgurl':'http://www.njglyy.com/images/banner8.jpg'
           },
           {
               'imgurl':'http://www.njglyy.com/images/banner4.jpg'
           },
           {
               'imgurl':'http://www.jshtcm.com/upload_files/other/20121213191243_JUU1JThEJTk3JUU5JTk5JUEyJUU1JTg1JUIwJUU0JUJBJUFEMQ==.jpg'
           }
       ]
       this.setState({
           banner: arr
       })
    }

    goMenu(_el){
        //console.log(_el)
        let user = loadUser()
        console.log()
        switch (_el.text) {
                case '住院信息':
                    typeof(user.cardNo) === 'undefined'?
                        this.context.router.history.push('/login'):
                        this.context.router.history.push('/inHospital')
                    break;
            }
    }


    render(){
        return(
            <div className="home">
                <Header/>
                <Slide banner={this.state.banner}/>
                <div className="menu">
                    <Grid data={data1}
                          columnNum={3}
                          onClick={_el => console.log(_el)}
                          renderItem={dataItem => (
                              <div >
                                  <img src={dataItem.icon} style={{ width: '48px', height: '48px' }} alt="" />
                                  <div className="remark">
                                      <p className="title">{dataItem.title}</p>
                                      <p className="sub">{dataItem.sub}</p>
                                  </div>
                              </div>
                          )}
                    />
                </div>
                <div className="content">
                    <Grid data={data}
                          hasLine={false}
                          columnNum={3}
                          onClick={this.goMenu.bind(this)}
                          renderItem={dataItem => (
                              <div >
                                  <img src={dataItem.icon} style={{ width: '42px', height: '42px' }} alt="" />
                                  <div className="remark">
                                      <p className="title">{dataItem.text}</p>
                                  </div>
                              </div>
                          )}
                    />
                </div>

            </div>
        )
    }
}
Home.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Home;