import React, { Component } from 'react';
import './App.css';
import { Route, Redirect } from 'react-router'
import { HashRouter, Switch } from 'react-router-dom'
import AnimatedRouter from 'react-animated-router'; //我们的AnimatedRouter组件
import 'react-animated-router/animate.css'; //引入默认的动画样式定义
import MainLayout from './components/main-layout'
import Login from './components/login'
import InHospital from './components/in-hospital'
import InHospitalDetail from './components/in-hospital-detail'
import MessageDetail from './components/message-detail'

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <div>
            <AnimatedRouter >
              <Route exact path="/" component={MainLayout} />
              {<Route exact path="/main/:selected" component={MainLayout} />}
              <Route exac path="/login"  component={Login} />
              <Route exac path="/inHospital" component={InHospital}/>
              <Route exac path="/inHospitalDetail/:data" component={InHospitalDetail}/>
              <Route exact path="/messageDetail/:id" component={MessageDetail}/>
            </AnimatedRouter >
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
