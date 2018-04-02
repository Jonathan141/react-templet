
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import {Popover, Spin, message,Popconfirm, Form,Modal, InputNumber,Icon, Input, Button, Row, Col } from 'antd'
// import { fetchLogin } from 'actions/common'
import './index.less'
import axios from "api/axios";
import * as api from "api/url";
import {bettingTools} from '../../../../utils/bettingTools'
const FormItem = Form.Item
import {
    addAllValues,fetchOrderList,fetchChaseOrderList
} from 'actions/home'
@connect(
  (state, props) => ({
    config: state.config,
    homeRows: state.homeRows,
    allBettingValues:state.allBettingValues,
    loginResponse: state.loginResponse,
    caizhongType:state.caizhongType,
    caizhongObjQuery:state.caizhongObjQuery,
    bettingValueObj:state.bettingValueObj,
    platformIdValue:state.platformIdValue,
    lotteryObjQuery:state.lotteryObjQuery,
    lotteryListQuery:state.lotteryListQuery,
    orderObjQuery:state.orderObjQuery
  })
)
@Form.create({
  onFieldsChange(props, items) {
    // console.log(items)
    // props.cacheSearch(items);
  },
})

export default class OtherPanel extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
      zhushu:0,
      account:0,
      iszhuihao:false,
      showTime:'00:00:00',
      deailObj:null
    }
  }

  handleSubmit(e) {
    
  }

  handleChange(e) {
  
  }
  componentWillReceiveProps(){
 
  }
 
  componentDidMount() {
  }
 
 
  bettingMangNow(){
    let allBettingValues = this.props.allBettingValues
    let issueCode = this.props.lotteryObjQuery
    let onPlayObj = this.props.onPlayObj
    let parms = []
    for(let a in allBettingValues){
        let data= {}
        for(let b in bettingTools){
            if(bettingTools[b].id ==allBettingValues[a].id){
                 data.bet_number = bettingTools[b].getBettingValue(allBettingValues[a].onPlayObj.method_config,allBettingValues[a].values)
            }
            console.log(bettingTools[b])
        }
        data.bet_code = allBettingValues[a].onPlayObj.method_code
        data.bet_count = allBettingValues[a].bettingNum
        data.estimate_win_price = 1950*100/~~allBettingValues[a].onPlayObj.method_factor*allBettingValues[a].mUltiple.toFixed(4)
        data.ip= '127.0.0.1'
        data.issue_code = issueCode.result.issue
        data.issue_seq = 34
        data.lottery_code  = "cqssc"
        data.method_id = allBettingValues[a].onPlayObj.id
        data.modes = 0//圆角分
        data.multiple = allBettingValues[a].mUltiple
        data.platform_id = 1
        data.single_price = 2
        data.source_type = 0
        data.total_money = allBettingValues[a].Amount
        data.user_bonus_group = 1980
        data.user_id = 22
        data.user_rebate_rate = 7.5
        console.log(data)
        parms.push(data)
    }
    axios.post(api.LOTTERY_BET_REQUEST, parms)
        .then(res => {
          this.props.dispatch(addAllValues({allValues:[]}))
          Modal.success({
            title: '投注通知',
            content: '您的投注成功！'
        });
        }).catch(e => {
    })
  }
  showConfirm(obj){
    let parms = {}
    let  cArray = []
    parms.bet_id = ~~obj.bet_id
    parms.issue_code = obj.issue_code
    parms.lottery_code = obj.lottery_code
    parms.operate_by = '大比索'
    parms.platform_id = ~~obj.platform_id
    cArray.push(parms)
    Modal.confirm({
      title: '您是否确认要撤销？',
      onOk: function() {
        axios.post(api.LOTTERY_BET_CANCEL, cArray)
        .then(res => {
            Modal.success({
                title: '消息',
                content: '撤销成功！'
            });
            }).catch(e => {
        })
      },
      onCancel: function() {
        console.log(obj)
      }
    });
  }
  showDetails(l){
    console.log(l)
    this.setState({
      deailObj:l
    })
  }
  handleOk() {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false, visible: false })
    }, 3000)
  }
  handleCancel() {
    this.setState({ visible: false })
  }
  onChange(){

  }
  putongZhudan(){
    let orderObjQuery = this.props.orderObjQuery.result?this.props.orderObjQuery.result.rows:[]
    let trs = []
    for(let l in orderObjQuery){
      let tr = <tr>
                    <td>Tanmay</td>
                    <td>Bangalore</td>
                    <td>560001</td>
                    <td>Tanmay</td>
                    <td className="qqelk">
                      <Popover  content={this.content(orderObjQuery[l].bet_number)} >
                        <span className="name-tile">{orderObjQuery[l].bet_number}</span>
                      </Popover>
                    </td>
                    <td>{orderObjQuery[l].multiple}</td>
                    <td>Tanmay</td>
                    <td>Bangalore</td>
                    <td>560001</td>
                    <td>
                      <button type="button" className="btn btn-default btn-xs" onClick={()=>this.showConfirm(orderObjQuery[l])}>撤单</button>
                      <button type="button" className="btn btn-default btn-xs" data-toggle="modal" data-target="#myModal" onClick={()=>this.showDetails(orderObjQuery[l])}>查看详情</button>
                    </td>
                </tr>
      trs.push(tr)
    }
    return (
        trs
      )
  }
  render() {
    return (
    
              <div>
                      起始倍数:<InputNumber min={1} max={99999} defaultValue={1} onChange={()=>this.onChange}/>
                      追号期数:<InputNumber min={1} max={99999} defaultValue={2} onChange={()=>this.onChange}/>
                      <span>
                        (最多能追360期)
                      </span>
                      <button type="button" className="btn  pull-right">生成追号计划</button>

                      <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="col-md-1">序号</th>
                                <th className="col-md-2">追号期次</th>
                                <th className="col-md-2">倍数</th>
                                <th className="col-md-2">金额</th>
                                <th className="col-md-5">预计开奖时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td><label><input name="Fruit" type="checkbox" value="" />1766546 </label></td>
                                <td><input type="text" /></td>
                                <td>432</td>
                                <td>2017-11-17 18:23:43</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td><label><input name="Fruit" type="checkbox" value="" />1766546 </label></td>
                                <td><input type="text" /></td>
                                <td>4324</td>
                                <td>2017-11-17 18:23:43</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td><label><input name="Fruit" type="checkbox" value="" />1766546 </label></td>
                                <td><input type="text" /></td>
                                <td>54325</td>
                                <td>2017-11-17 18:23:43</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-center"> 
                        <span>共追号 5 期，10注，金额￥20.00元</span><label><input className="grrdeasw" name="Fruit" type="checkbox" value="" />中奖后停止追号 </label>
                        <button type="button" className="btn  pull-right">立即追号</button>
                    </p>
          </div>
    )
  }
}
