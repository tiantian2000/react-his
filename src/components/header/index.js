/**
 * Created by Administrator on 2018/11/30.
 */
/**
 * Created by Administrator on 2018/11/30.
 */
import React, { Component } from 'react';
import { Card,Icon  } from 'antd-mobile';
import './style.less'
import img from './logo.png';

class Home extends Component {

    render(){
        return(
            <div className="header">
                <Card full>
                    <Card.Header
                        title='社区医疗助手'
                        extra="community health care assistant"
                        thumb={img}
                    />
                </Card>
            </div>
        )
    }
}

export default Home;