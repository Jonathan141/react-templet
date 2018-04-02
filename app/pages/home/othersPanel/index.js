
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import {Popover, Spin, message,Popconfirm, Form,Modal, InputNumber,Icon, Input, Button, Row, Col } from 'antd'
// import { fetchLogin } from 'actions/common'
import logo from 'img/u170.jpg'
import './index.less'
import axios from "api/axios";
import ZhuihaoPanel from "./zhuihaoPanel";
import * as api from "api/url";
import {bettingTools} from '../../../utils/bettingTools'
const FormItem = Form.Item
import {
    addAllValues,fetchOrderList,fetchChaseOrderList,fetchlotteryList,fetchlotteryObj
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
  componentWillReceiveProps(){
  //   let platformId = this.props.platformIdValue
  //   let caizhongObj = this.props.caizhongObjQuery
  //   let res = !this.props.lotteryObjQuery.result?'':this.props.lotteryObjQuery.result
    if(!window.rtfrd){
      window.rtfrd = true
      let pasobj ={}
      pasobj.lottery_code = 'CQSSC'
      pasobj.issue_code = '180321071'
      pasobj.platform_id = 1
      pasobj.user_id = 22
      console.log(pasobj)
      this.props.dispatch(fetchOrderList(pasobj))
    }
    if(this.props.lotteryObjQuery.result){
      let str = this.props.lotteryObjQuery.result
      var date2 = new Date(str.endtime)
      var date1 = new Date(str.nowtime)
      var s1 = date1.getTime(),s2 = date2.getTime();
      var total = (s2 - s1)/1000;
      if(window.dgrewr){
        return
      }
      window.dgrewr = true
      // let dfd = this.formatTime(total)
      //   this.setState({
      //     showTime:dfd
      //   })
      let fdf = window.setInterval(()=>{
        if(total==0){
          clearInterval(fdf);
          window.dgrewr = false
          let caizhongType = this.props.caizhongType
          this.props.dispatch(fetchlotteryList('/'+caizhongType+ '/' + 5))
          this.props.dispatch(fetchlotteryObj('/'+caizhongType))
        }else{
          total--
          let dfd = this.formatTime(total)
          this.setState({
            showTime:dfd
          })
          this.setState({
            hr:false
          })
        }
      },1000)
    }
  }
  formatTime(total){
    var day = parseInt(total / (24*60*60));
    var afterDay = total - day*24*60*60;
    var hour = parseInt(afterDay/(60*60)) + day*24;
    var afterHour = total - day*24*60*60 - hour*60*60;
    var min = parseInt(afterHour/60);
    var afterMin = total - day*24*60*60 - hour*60*60 - min*60;
    hour = hour<10?'0'+hour:hour
    min = min<10?'0'+min:min
    afterMin = afterMin<10?'0'+afterMin:afterMin
    return [hour,min,afterMin].join(':')
  } 
  getShowTime(){
    let str = !this.props.lotteryObjQuery.result?'':this.props.lotteryObjQuery.result
    var date2 = new Date(str.endtime)
    var date1 = new Date(str.nowtime)
    var s1 = date1.getTime(),s2 = date2.getTime();
    var total = (s2 - s1)/1000;
    window.setTimeout(()=>{
      --total
      let dfd = this.formatTime(total)
      this.setState({
        showTime:dfd
      })
    },1000)
  }
  // 组件已经加载到dom中
  componentDidMount() {
  }
  getZonshu(){
    let ads = this.props.allBettingValues
    let zhushu=0
    for(let a =ads.length -1;a>-1;a--){
        zhushu+=ads[a].bettingNum
    }
    return zhushu
  }
  getAccount(){
    let ads = this.props.allBettingValues
    let account=0
    for(let a =ads.length -1;a>-1;a--){
        account+=ads[a].Amount
    }
    return account
  }
  zhuihao(state){
    let ads = this.props.allBettingValues
    if(ads.length ==0){
      this.setState({
        iszhuihao:false
      })
    }else{
      this.setState({
        iszhuihao:state
      })
    }
  }
  zhuihaoElement(){
    let ads = this.props.allBettingValues
    if(ads.length ==0){
        return (
        <div>
            <Popover content={'请先选号！'} >
                  <input id="ck1" disabled="disabled" type="checkbox"/> <label htmlFor="ck1">是否追号</label>
            </Popover>
        </div>
        )
    }else{
        return (
        <div>
            <input id="ck1" type="checkbox" onClick={this.zhuihao.bind(this,!this.state.iszhuihao)}/><label htmlFor="ck1">是否追号</label> 
        </div>
        )
    }             
  }
  checkName(rule, value, callback) {
    // const { validateFields } = this.props.form
    if (value) {
      // validateFields([''])
    }
    callback()
  }
  content(a){
    return (
      <div>
        {a}
      </div>
    )
  }
  createGrild(){
    let ads = this.props.allBettingValues
    let ar =[]
    let zhushu=0,account=0
    for(let a =ads.length -1;a>-1;a--){
      ar.push(
        <tr key={a}><td width='20%'>
          <Popover  content={this.content(ads[a].methdName)} >
            <span className="name-tile"> {ads[a].methdName}</span>
          </Popover>
        </td>
        <td width='10%'>{ads[a].model}</td>
        <td width='10%'>{ads[a].bettingNum}</td>
        <td width='20%'>{ads[a].mUltiple}</td>
        <td width='15%'>{ads[a].Amount}</td>
        <td width='15%'>{ads[a].keyingValue}元</td>
        <td width='20%'><span onClick={this.deleteBetting.bind(this,a)} className="glyphicon glyphicon-remove"></span></td>
        </tr>
      )
      // zhushu+=ads[a].bettingNum
      // account+=ads[a].Amount
    }
    
    return (ar)
  }
  deleteBetting(a){
    let ads = this.props.allBettingValues
    let nre = ads.concat()
    nre.splice(a,1);
    if(nre.length ==0){
      this.setState({
          iszhuihao:false
      })
    }
    this.props.dispatch(addAllValues({allValues:nre}))
    console.log(a)
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
  getZhuihaoElementAllPanel(){
    if(this.state.iszhuihao){
      return (
            <ZhuihaoPanel/>
        )
    }
  }
  onDelete(f){
    console.log(22222)
  }
  cancel(f){
    console.log(333333)
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
      <div className="other-ptr container">
           <div className="row">
              <div className="col-md-8 grftgess" >
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>玩法及投注</th>
                        <th>模式</th>
                        <th>注数</th>
                        <th>倍数</th>
                        <th>金额</th>
                        <th>可盈金额</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.createGrild()}
                    </tbody>
                  </table>
              </div>
              <div className="col-md-2  panel-default" >
                <div className="col-md-12 panel panel-default" >
                  <p className="text-right">
                    <h5 >总投注数</h5>
                    <p>{this.getZonshu()}</p>
                  </p>
                  <p className="text-right">
                    <h5>投注总金额</h5>
                    <p>{this.getAccount()}元</p>
                  </p>
                </div> 
                  <div>
                    <button type="button" disabled={this.props.allBettingValues.length==0?'disabled':null} onClick={this.bettingMangNow.bind(this)} className="btn btn-primary">确认投注    截止还有:{this.state.showTime}</button>
                    {this.zhuihaoElement()}
                  </div>
              </div>
           </div>
           {this.getZhuihaoElementAllPanel()}
           <div className="text-center row rrf-eg">
              <ul id="myTab" className="nav nav-tabs">
                <li className="active">
                  <a href="#home" data-toggle="tab">普通注单</a>
                </li>
                <li>
                  <a href="#ios" data-toggle="tab">追号注单</a>
                </li>
                <li className="pull-right">
                  <a href="#ios" >查看更多</a>
                </li>
              </ul>
              <div id="myTabContent" className="tab-content guuess">
                <div className="tab-pane fade in active" id="home">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="col-md-1">彩种</th>
                        <th className="col-md-1">玩法</th>
                        <th className="col-md-1">奖期</th>
                        <th className="col-md-1">开奖号码</th>
                        <th className="col-md-1">投注内容</th>
                        <th className="col-md-1">倍数</th>
                        <th className="col-md-1">投注金额</th>
                        <th className="col-md-1">奖金</th>
                        <th className="col-md-1">状态</th>
                        <th className="col-md-3">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.putongZhudan()}
                    </tbody>
                  </table>
                </div>
                <div className="tab-pane fade" id="ios">
                  
                </div>
                <div className="tab-pane fade" id="jmeter">
                  
                </div>
                <div className="tab-pane fade" id="ejb">
                  
                </div>
              </div>
           </div>
           <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                     &times;
                  </button>
                  <h4 className="modal-title" id="myModalLabel">
                    注单详情
                  </h4>
                </div>
                <div className="modal-body">
                  <div class="row">
                    <div class="col-md-6" >
                       <p>彩种:{this.state.deailObj&&this.state.deailObj.lottery_code}</p>
                       <p>彩种期号:{this.state.deailObj&&this.state.deailObj.issue_code}</p>
                       <p>玩法:{this.state.deailObj&&this.state.deailObj.method_id}</p>
                       <p>投注金额:{this.state.deailObj&&this.state.deailObj.total_money}</p>
                       <p>投注内容:{this.state.deailObj&&this.state.deailObj.bet_number}</p>
                    </div>
                    <div class="col-md-6" >
                       <p>注单编号:{this.state.deailObj&&this.state.deailObj.bet_id}</p>
                       <p>投注时间:{this.state.deailObj&&this.state.deailObj.bet_time}</p>
                       <p>模式:{this.state.deailObj&&this.state.deailObj.modes}</p>
                       <p>状态:{this.state.deailObj&&this.state.deailObj.total_money}</p>
                       <p>倍数:{this.state.deailObj&&this.state.deailObj.multiple}</p>
                       <p>返点:{this.state.deailObj&&this.state.deailObj.user_bonus_group}</p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">关闭
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>  
    )
  }
}
