
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Spin, message, Form,Modal, Icon, Input, Button, Row, Col } from 'antd'
// import { fetchLogin } from 'actions/common'
import logo from 'img/u170.jpg'
import './index.less'
const FormItem = Form.Item
import {
    fetchlotteryList,fetchlotteryObj
} from 'actions/home'
@connect(
  (state, props) => ({
    config: state.config,
    homeRows: state.homeRows,
    caizhongType:state.caizhongType,
    caizhongObjQuery:state.caizhongObjQuery,
    lotteryObjQuery:state.lotteryObjQuery,
    lotteryListQuery:state.lotteryListQuery,
  })
)
@Form.create({
  onFieldsChange(props, items) {
    // console.log(items)
    // props.cacheSearch(items);
  },
})

export default class HeadMenue extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
      showTime:'00:00:00',
      ModalText:'greg'
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.state.loading = true
        Object.keys(values).map((key) => values[key] = (values[key] && values[key].trim()))
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
    if(this.props.lotteryObjQuery.result){
      let str = this.props.lotteryObjQuery.result
      var date2 = new Date(str.endtime)
      var date1 = new Date(str.nowtime)
      var s1 = date1.getTime(),s2 = date2.getTime();
      var total = (s2 - s1)/1000;
      if(window.isFreshT){
        return
      }
      window.isFreshT = true
      let dfd = this.formatTime(total)
        this.setState({
          showTime:dfd
        })
      let fdf = window.setInterval(()=>{
        if(total==0){
          this.setState({
            visible: true
           });
          setTimeout(() => {
           this.setState({
            visible: false
           });
          }, 3000);
          clearInterval(fdf);
          window.isFreshT = false
          let caizhongType = this.props.caizhongType
          this.props.dispatch(fetchlotteryList('/'+caizhongType+ '/' + 5))
          this.props.dispatch(fetchlotteryObj('/'+caizhongType))
        }else{
          total--
          let dfd = this.formatTime(total)
          this.setState({
            showTime:dfd
          })
        }
      },1000)
    }
  }
  // 组件已经加载到dom中
  componentDidMount() {
    let caizhongType = this.props.caizhongType
    this.props.dispatch(fetchlotteryList('/'+caizhongType+ '/' + 5))
    this.props.dispatch(fetchlotteryObj('/'+caizhongType))
  }
  caizhongName(){
    let row = !this.props.homeRows.result?[]:this.props.homeRows.result.rows
    let caizhongType = this.props.caizhongType
    for(let r in row){
      if(caizhongType==row[r].id){
        return row[r].cn_name
      }
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
  winCodeShow(){
    let str = !this.props.lotteryListQuery.result?'':this.props.lotteryListQuery.result.rows[0].wincode
    return str.replace(/,/g, '')
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
  handleCancel(){
    console.log(767687658)
    this.setState({
      visible: false
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="game-type">
        <div className="panel panel-default">
            <div className="panel-body">
                <div className="row head-menue">
                  <div className="col-md-3">
                     <span>{this.caizhongName()}</span><br/>
                     <span>{!this.props.lotteryObjQuery.result?'':this.props.lotteryObjQuery.result.issue}期</span>
                  </div>
                  <div className="col-md-3" >
                     <span>倒计时</span>
                     <span>{this.state.showTime}</span>
                  </div>
                  <div className="col-md-4" >
                    <div className="col-md-4" >
                      <span>开奖号码</span><br/>
                      <span>{!this.props.lotteryListQuery.result?'':this.props.lotteryListQuery.result.rows[0].issue}期</span>
                    </div>
                    <div className="col-md-8" >
                       <span>{this.winCodeShow()}</span>
                    </div>
                  </div>
                  <div className="col-md-2" >
                     <span><span className="glyphicon glyphicon-question-sign"></span>玩法说明</span><br/>
                     <span><span className="glyphicon glyphicon-random"></span>走势图</span>
                  </div>
               </div>
            </div>
                  <Modal  visible={this.state.visible}
                    onCancel={()=>this.handleCancel()}
                  >
                    <h5 className="text-center">{this.props.caizhongObjQuery.cn_name}</h5>
                    <p className="text-center">第<span style={{color:'red'}}>{!this.props.lotteryObjQuery.result?'':this.props.lotteryObjQuery.result.issue}</span>期售彩已结束</p>
                    <p className="text-center">当前已进入下一期，请留意奖期变化！</p>
                  </Modal>
        </div>
      </div>
    )
  }
}
