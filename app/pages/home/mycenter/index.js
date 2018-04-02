
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { Spin, message, Form, Icon, Input, Button, Row, Col ,Menu} from 'antd'
// import { fetchLogin } from 'actions/common'
import logo from 'img/u170.jpg'
import './index.less'
const FormItem = Form.Item
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup;
@connect(
  (state, props) => ({
    config: state.config,
    loginResponse: state.loginResponse,
  })
)
@Form.create({
  onFieldsChange(props, items) {
    // console.log(items)
    // props.cacheSearch(items);
  },
})

export default class Betting extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.state.loading = true
        console.log(values)
        // this.setState({loading: true})
        Object.keys(values).map((key) => values[key] = (values[key] && values[key].trim()))
        /* this.props.dispatch(fetchLogin(values, (res) => {
          if (res.status == 1) {
            const query = this.props.form.getFieldsValue()
            global.$GLOBALCONFIG.staff = res.data.user
            sessionStorage.setItem('staff', JSON.stringify({ ...res.data.user }))
            sessionStorage.setItem('username', query.username)
            // sessionStorage.setItem('userName', res.data.user.userName)
            // sessionStorage.setItem('userpwd', query.password)
            sessionStorage.setItem('token', res.data.token)
            sessionStorage.setItem('isLeftNavMini', false)
            hashHistory.push('/')
          }
        }, (res) => {
          message.warning(res.msg)
          this.setState({
            loading: false
          })
        }))*/
        sessionStorage.setItem('token', 'dupi')
        sessionStorage.setItem('username', values.username)
        hashHistory.push('/')
      }
    })
  }

  handleChange(e) {
    const newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    // this.props.dispatch(fetchLogin({ currentPage: 1 }))
  }

  checkName(rule, value, callback) {
    // const { validateFields } = this.props.form
    if (value) {
      // validateFields([''])
    }
    callback()
  }

  checkPass(rule, value, callback) {
    // const { validateFields } = this.props.form
    if (value) {
      // validateFields([''])
    }
    callback()
  }
  handleClick = (e) => {
    console.log('click ', e);
  }
  noop() {
    return false
  }

  render() {
    const { loginResponse } = this.props.loginResponse
    const { getFieldDecorator } = this.props.form
    return (
      <div className="center-panel">
        <div className="col-xs-3 col-sm-3 menue">
            <Menu
                onClick={this.handleClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>投注记录</span></span>}>
                    <Menu.Item key="1">幸运彩票</Menu.Item>
                    <Menu.Item key="2">电子娱乐</Menu.Item>
                    <Menu.Item key="3">真人娱乐</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>资金管理</span></span>}>
                  <Menu.Item key="5">我要充值</Menu.Item>
                  <Menu.Item key="6">我要提现</Menu.Item>
                  <Menu.Item key="6">我要转账</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>账户中心</span></span>}>
                  <Menu.Item key="5">安全中心</Menu.Item>
                  <Menu.Item key="6">银行卡管理</Menu.Item>
                  <Menu.Item key="6">个人资料</Menu.Item>
                  <Menu.Item key="6">我的奖金组</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="appstore" /><span>代理中心</span></span>}>
                  <Menu.Item key="5">代理首页</Menu.Item>
                  <Menu.Item key="6">开户中心</Menu.Item>
                  <Menu.Item key="6">团队管理</Menu.Item>
                  <Menu.Item key="6">团队报表</Menu.Item>
                </SubMenu>
                <SubMenu key="sub5" title={<span><Icon type="appstore" /><span>消息中心</span></span>}>
                  <Menu.Item key="5">公告</Menu.Item>
                  <Menu.Item key="6"><Link to="/notifications">站内信</Link></Menu.Item>
                  <Menu.Item key="7">通知设置</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>帮助中心</span></span>}>
                  <Menu.Item key="5">帮助</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
        <div className="col-xs-6 col-sm-9 menue">
            {this.props.children}
        </div>
      </div>
    )
  }
}
