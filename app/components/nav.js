import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { Menu, Dropdown, Button, Modal, message } from 'antd'
import * as api from "api/url";
import axios from "api/axios";
import './nav.less'
@connect(
  (state, props) => ({ config: state.config })
)
export default class Nav extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
      userName:'特朗普',
      balance:0,
      newMail:0,
    }
  }
  componentDidMount() {
    axios.get(api.PLATFORM_TOP)
      .then(res => {
        this.setState({
            userName:res.data.result.username,
            balance:res.data.result.userbalance,
            newMail:res.data.result.newmailcount, 
        })
      }).catch(e => {
        this.setState({
          loading:false,
          status:false,
          msg:e
        })
    })
  }
  handLogout(){
    axios.get(api.LOGOUT)
      .then(res => {
        sessionStorage.setItem('token',null)
        hashHistory.push('/login')
      }).catch(e => {
        
    })
  }
  showFalgValue(){
    let text  =  '此域名'
    let yes = "请注意,"+text+"未通过验证！"
    let no = "恭喜，"+text+"通过验证！"
    if(this.state.isOk){
      return <Alert message={yes} type="error" showIcon/>
    }else{
      return <Alert message={no} type="success" showIcon/>
    }
  }
  render() {
    return (
        <nav className="navbar navbar-inverse" role="navigation">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">BB菠菜</a>
                </div>
                <div>
                    <ul className="nav navbar-nav">
                        <li ><a href="#">用户名：{this.state.userName}</a></li>
                        <li><a href="#" onClick={this.handLogout}>安全退出</a></li>
                        <li ><a href="#">余额：{this.state.balance}</a></li>
                        <li><a href="#">隐藏</a></li>
                        <li><a href="#">充值</a></li>
                        <li><a href="#">提款</a></li>
                        <li><Link to="/center">用户中心</Link></li>
                        <li><Link to="/notifications">站内信{this.state.newMail}</Link></li>
                        <li ><a href="#">在线客服</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
  }
}
