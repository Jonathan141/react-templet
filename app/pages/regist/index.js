
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Spin, message, Form, Icon, Input, Button, Row, Col } from 'antd'
// import { fetchLogin } from 'actions/common'
import logo from 'img/u170.jpg'
import { Link } from 'react-router'
import './index.less'
import Header from '../common/header'
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

  noop() {
    return false
  }

  render() {
    const { loginResponse } = this.props.loginResponse
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <div className=""><Header/></div>
        <div className="btmLogin">
          <div className="kuai">
            <img src={logo}/>
          </div>
          <div className="sy_bottom kuai">
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
                      {getFieldDecorator('username', {
                        rules: [
                          { required: true, message: '登录密码' },
                          { validator: this.checkName },
                          // { pattern: regExpConfig.IDcardTrim, message: '身份证号格式不正确' }
                        ],
                        // validateTrigger: 'onBlur',
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                          placeholder="登录密码"
                          type="text"
                        />
                        )}
                    </FormItem>
                    <FormItem hasFeedback>
                      {getFieldDecorator('password', {
                        rules: [
                          { required: true, message: '确认密码' },
                          // { pattern: regExpConfig.pwd, message: '密码只能是6-16个数字或者字母组成' }
                        ],
                        // validateTrigger: 'onBlur',
                      })(
                        <Input
                          prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                          placeholder="确认密码"
                          type="password"
                        />
                        )}

                    </FormItem>
                    <FormItem>
                      <Button type="primary" htmlType="submit">立即注册</Button>
                    </FormItem>
                  </Form>
                </Spin>
              </Col>
              <div className="c-row">已有账户，直接<Link to="/login">登录</Link></div>
              <div >QQ账号：123456   |  Skype账号：123456</div>
            </Row>
          </div>

        </div>

        <div id="companyName" className="companyName">肚皮叔股份有限公司</div>
      </div>
    )
  }
}
