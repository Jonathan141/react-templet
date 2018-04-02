
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Spin, message, Form, Icon, Input, Button, Row, Col } from 'antd'
// import { fetchLogin } from 'actions/common'
import logo from 'img/u170.jpg'
import './index.less'
import * as api from "api/url";
import Header from '../common/header'
import axios from "api/axios";
const FormItem = Form.Item
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

export default class Login extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
      status: true,
      msg:''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.checkPass = this.checkPass.bind(this)
    this.checkName = this.checkName.bind(this)
    this.noop = this.noop.bind(this)
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
        let parms = {
          account: values.username,
          password: values.password
        }
        let self = this
        console.log(this.props)
        axios.post(api.LOGIN, parms)
          .then(res => {
            sessionStorage.setItem('token',2343)
            hashHistory.push('/betting')
          }).catch(e => {
            self.setState({
              loading:false,
              status:false,
              msg:e
            })
        })



        // sessionStorage.setItem('token', 'dupi')
        // sessionStorage.setItem('username', values.username)
        // hashHistory.push('/')
      }
    })
  }
  loginMsg(){
    if(!this.state.status){
      return (<div id="PerformName">
                  <div className="alert alert-warning">
                    <strong>警告！</strong>
                    {this.state.msg}
                  </div>
              </div>);
    }else{
      return (<div id="PerformName">
                  <div className="alert alert-success">
                    <strong>提示！</strong>输入正确的用户名和密码进行登录。
                  </div>
              </div>);
    }
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

  noop() {
    return false
  }

  render() {
    const { loginResponse } = this.props.loginResponse
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <div className="">
          <Header/>
        </div>
        <div className="btmLogin">
          <div className="kuai">
            <img src={logo}/>
          </div>
          <div className="sy_bottom kuai">
           {this.loginMsg()}
            <Row className="ul-wrap">
              <Col span={24}>
                <Spin spinning={this.state.loading}>
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem hasFeedback>
                      {getFieldDecorator('username', {
                        rules: [
                          { required: true, message: '请输入用户名' },
                          { validator: this.checkName },
                          // { pattern: regExpConfig.IDcardTrim, message: '身份证号格式不正确' }
                        ],
                        // validateTrigger: 'onBlur',
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                          placeholder="请输入用户名"
                          type="text"
                        />
                        )}
                    </FormItem>
                    <FormItem hasFeedback>
                      {getFieldDecorator('password', {
                        rules: [
                          { required: true, message: '请输入密码' },
                          // { pattern: regExpConfig.pwd, message: '密码只能是6-16个数字或者字母组成' }
                        ],
                        // validateTrigger: 'onBlur',
                      })(
                        <Input
                          prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                          placeholder="请输入密码"
                          type="password"
                        />
                        )}

                    </FormItem>
                    <FormItem>
                      <Button type="primary" htmlType="submit">登录</Button>
                    </FormItem>
                  </Form>
                </Spin>
              </Col>
            </Row>
          </div>
        </div>
        <div id="companyName" className="companyName">肚皮叔股份有限公司</div>
      </div>
    )
  }
}
