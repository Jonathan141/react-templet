
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Spin, message, Form, Icon, Input, Button, Row, Col } from 'antd'
// import { fetchLogin } from 'actions/common'
import logo from 'img/u170.jpg'
import './index.less'
import Nav from 'components/nav'
import Header from '../common/header'
import HeadMenue from './headMenue'
import { routerActions } from 'react-router-redux'
import Betting from './betting'
import OtherPanel from './othersPanel'
import * as api from "api/url";
import axios from "api/axios";
import {
  fetchHomeList,requestCaizhongId,
  changeUiStyle,changeKeyValues,setPlayObjValue,addAllValues,changeBatchStates,getbettingValues,fetchOrderList,fetchChaseOrderList
} from 'actions/home'

const FormItem = Form.Item
@connect(
  (state, props) => ({
    config: state.config,
    homeRows: state.homeRows,
    caizhongType:state.caizhongType,
    changeUiStyle:state.changeUiStyle,
    uiStyleObj:state.uiStyleObj,
    onPlayObj:state.onPlayObj,
    allBettingValues:state.allBettingValues,
    batchStatesArray:state.batchStatesArray,
    keyValuesObj:state.keyValuesObj,
    bettingValueObj:state.bettingValueObj,
    lotteryObjQuery:state.lotteryObjQuery,
    lotteryListQuery:state.lotteryListQuery,
  }),
  (dispatch) => ({ actions: bindActionCreators(routerActions, dispatch),
        dispatch: dispatch })
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
      caizhonglist:666
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
  componentWillReceiveProps(){
  }
  componentDidMount() {
    this.props.dispatch(fetchHomeList({name:323},{namefr:767}))
    
    // axios.get(api.LOTTERY_LIST)
    //   .then(res => {
    //     this.props.dispatch(recevieHomeList({ title: e.item.props.name, content: '', key: e.key }))
    //     // this.setState({
    //     //   caizhonglist:res
    //     // })
    //     console.log(res)
    //   }).catch(e => {
    //     this.setState({
    //       loading:false,
    //       status:false,
    //       msg:e
    //     })
    // })
  }

  

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="other-p container">
          <Nav/>
          <Header/>
          <HeadMenue/>
          {this.props.children}
          
          <OtherPanel/>
        <div id="companyName" className="companyName">肚皮叔股份有限公司</div>
      </div>
    )
  }
}
