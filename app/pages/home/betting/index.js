
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Spin, message, Form, Icon, Input,Modal, Button, Row, Col,InputNumber ,Slider } from 'antd'
// import { fetchLogin } from 'actions/common'
import logo from 'img/u170.jpg'
import './index.less'
import StyleUi1 from './gameScene/style1.js'
import StyleUi2 from './gameScene/style2.js'
import StyleUi3 from './gameScene/style3.js'
import StyleUi4 from './gameScene/style4.js'
import StyleUi5 from './gameScene/style5.js'
import {gameSenceObject} from '../../../utils/gameSenceData'
import {fandianQuery,zhongjinagjine,yinkuijine,toPoint} from '../../../utils/tools'
import {bettingTools} from '../../../utils/bettingTools'
import {
    changeUiStyle,changeKeyValues,setPlayObjValue,addAllValues,changeBatchStates,getbettingValues,fetchOrderList,fetchChaseOrderList,getCaizhongObj
} from 'actions/home'
import axios from "api/axios";
import * as api from "api/url";
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
      playGroupListId:'提示：请选择玩法组。',
      groupId:1,
      playId:1,
      groupUiList:[],
      playUiList:[],
      mUnit:2,
      min:0,
      max:1,
      mUltiple:1,
      huaValue:0,
      fandianValuecont:0,
      fandianValue:0
    }
  }
  componentDidMount() {
    const caizhongTypeId = this.props.caizhongType
    const rows = this.props.homeRows.result?this.props.homeRows.result.rows:[]
  }
  componentWillReceiveProps(){
    // let pasobj ={}
    // let platformId = this.props.platformIdValue
    // let caizhongType = this.props.caizhongType
    // let res = !this.props.lotteryObjQuery.result?'':this.props.lotteryObjQuery.result
    // let rows = this.props.homeRows.result?this.props.homeRows.result.rows:[]
    // console.log(this.props.homeRows.result)
    // for(let i in rows){
    //   console.log(rows[i].id)
    //   if(rows[i].id == caizhongType){
    //     pasobj.lottery_code = rows[i].en_name
    //   }
    // }
    // pasobj.issue_code = res.issue
    // pasobj.platform_id = platformId
    // pasobj.user_id = 0
    // console.log(pasobj)
    // this.props.dispatch(fetchOrderList(pasobj))
  }
  playGroupClick(groupId){
    this.setState({
        groupId:groupId
    })
    
    const caizhongTypeId = this.props.caizhongType
    const rows = this.props.homeRows.result?this.props.homeRows.result.rows:[]
    let group = null
    for(let i in gameSenceObject.Lottery_type){
        if(gameSenceObject.Lottery_type[i].id ==caizhongTypeId){
            for(let g in gameSenceObject.Lottery_type[i].play_group){
                if(gameSenceObject.Lottery_type[i].play_group[g].id ==groupId){
                    group = gameSenceObject.Lottery_type[i].play_group[g].play_list
                }
            }
        }
    }
    this.setState({
        groupUiList:group
    })
    let array = []
    if(rows.length>0){
        for(let r in rows){
            if(rows[r].id == caizhongTypeId){
                for(let rs in rows[r].playGroupList){
                    if(rows[r].playGroupList[rs].id == groupId){
                        for(let y in rows[r].playGroupList[rs].playList){
                            let buttons = []
                            if(!window.oui){
                                window.oui=true
                                this.chioseGameScene({val:rows[r].playGroupList[rs].playList[y].methodList[0],g:group})
                            }
                            for(let tr in rows[r].playGroupList[rs].playList[y].methodList){
                                buttons.push(
                                    <button type="button" onClick={this.chioseGameScene.bind(this, {val:rows[r].playGroupList[rs].playList[y].methodList[tr]})}
                                    key={rows[r].playGroupList[rs].playList[y].methodList[tr].id} className="btn btn-default"> {rows[r].playGroupList[rs].playList[y].methodList[tr].method_name}</button>
                                )
                            }
                            array.push(
                                <div key={rows[r].playGroupList[rs].playList[y].id}>
                                <label> {rows[r].playGroupList[rs].playList[y].cn_name}：</label>
                                <div className="btn-group btn-group-xs">
                                    {buttons}
                                </div>
                                <br/>
                                </div>
                            )
                        }
                    }
                }
            }
        }
    } 
    
    this.setState({
        playGroupListId:array
    })
  }
  playGroupList() {
    const caizhongTypeId = this.props.caizhongType
    const rows = this.props.homeRows.result?this.props.homeRows.result.rows:[]
    let arras = []
    let id = null
    if(rows.length>0){
        for(let r in rows){
            if(rows[r].id == caizhongTypeId){
                id = rows[r].id
                if(!window.gfh){
                    window.gfh = true
                    this.props.dispatch(getCaizhongObj({caizhongObj:rows[r]}))
                    this.playGroupClick(rows[r].playGroupList[0].id)
                }
                for(let rs in rows[r].playGroupList){
                    arras.push(
                        <button type="button" onClick={this.playGroupClick.bind(this, rows[r].playGroupList[rs].id)} className="btn btn-default" key={rows[r].playGroupList[rs].id}> {rows[r].playGroupList[rs].cn_name}</button>
                    )
                }
            }
        }
        return (
            <div className="btn-group btn-group-sm">
                {arras}
            </div>
        );
    }else{
      return (
        <div className="btn-group btn-group-sm">
        </div>
      );
    }
  }
  getStyle(){
    let uiStyleObj = this.props.uiStyleObj
    if(uiStyleObj.style_type_name == 'style1'){
        return (
            <StyleUi1/>
        )
    }
    else if(uiStyleObj.style_type_name == 'style2'){
        return (
            <StyleUi2/>
        )
    }
    else if(uiStyleObj.style_type_name == 'style3'){
        return (
            <StyleUi3/>
        )
    }
    else if(uiStyleObj.style_type_name == 'style4'){
        return (
            <StyleUi4/>
        )
    }
    else if(uiStyleObj.style_type_name == 'style5'){
        return (
            <StyleUi5/>
        )
    }
  }
  chioseGameScene(obj){
    console.log(obj)
    let id = obj.val.id
    let group = null
    let df = obj.g?obj.g:this.state.groupUiList
    for(let i in df){
        if(df[i].id ==id){
            for(let b in bettingTools){
                if(bettingTools[b].id ==df[i].id){
                    df[i].ui_obj.getBettingNums = bettingTools[b].getBettingNums
                }
                console.log(bettingTools[b])
            }
            this.setState({
                playUiList:df[i].ui_obj
            })
            this.props.dispatch(changeUiStyle({uiObj:df[i].ui_obj}))
            let uiObj = df[i].ui_obj
            let rows = []
            for(let u=0;u<uiObj.row;u++){
              rows.push('key')
            }
            this.props.dispatch(changeBatchStates({batchStates:rows}))
        }
    }
    this.setState({
        playId:id
    })
    this.props.dispatch(setPlayObjValue({playObj:obj.val}))
    this.props.dispatch(changeKeyValues({keyValues:[]}))
    let factor = ~~obj.val.method_factor?~~obj.val.method_factor:1
    this.setState({
        min:1700*100/factor
    })
    this.setState({
        max:1950*100/factor
    })
    this.setState({
        fandianValue:1950*100/factor
    })
    console.log(id)
  }
  clickUnite(ut){
    this.setState({
        mUnit:ut
    })
  }
  handleChange=(value)=> {
    this.setState({
        mUltiple:value
    })
  }
  nashaList(){
    let ads = this.props.lotteryListQuery.result?this.props.lotteryListQuery.result.rows:[]
    let arr = []
    for(let o in ads){
        arr.push(
            <tr>
                <td>{ads[o].issue}期</td>
                 <td>
                    <span>{ads[o].wincode.charAt(0)}</span>
                    <span>{ads[o].wincode.charAt(2)}</span>
                    <span>{ads[o].wincode.charAt(4)}</span>
                    <span>{ads[o].wincode.charAt(6)}</span>
                    <span>{ads[o].wincode.charAt(8)}</span>
                </td>
            </tr>
         )
    }
    return (
        arr
    )
  }
  fandian(){
     
    
  }
  touzhuButton(){
    if(this.props.keyValuesObj.length ==0||this.props.bettingValueObj ==0){
        return (
            <div className="btn-group">
                <button type="button" className='btn btn-default gregrg' disabled="disabled"  data-toggle="button"> 
                    添加至号码篮<span className="glyphicon glyphicon-circle-arrow-down"></span>
                </button>
                <button type="button"  className='btn btn-default gregrg' disabled="disabled"  data-toggle="button"> 
                    直接投注<span className="glyphicon glyphicon-circle-arrow-right"></span>
                </button>
           </div>
        )
    }else{
        return (
            <div className="btn-group">
                <button type="button" className={this.props.bettingValueObj ==0?'btn btn-default gregrg':'btn btn-primary gregrg'}  onClick={this.addBettingArray.bind(this)} data-toggle="button"> 
                    添加至号码篮<span className="glyphicon glyphicon-circle-arrow-down"></span>
                </button>
                <button type="button"  className={this.props.bettingValueObj ==0?'btn btn-default gregrg':'btn btn-primary gregrg'}  onClick={this.zhijieBetting.bind(this)}  data-toggle="button"> 
                    直接投注<span className="glyphicon glyphicon-circle-arrow-right"></span>
                </button>
           </div>
        )
    }
  }
  iscommon(){
    let textNum =0
    let ads = this.props.allBettingValues
    let keyValuesObj = this.props.keyValuesObj
    for(let a in ads){
        textNum = 0
        for(let b in ads[a].values){
           for(let k in keyValuesObj){
                if(ads[a].values[b].key==keyValuesObj[k].key){
                    textNum++
                }
            } 
        }
    }
    return textNum==keyValuesObj.length?false:true
  }
  zhijieBetting(){
    let keyValuesObj = this.props.keyValuesObj
    let issueCode = this.props.lotteryObjQuery
    let onPlayObj = this.props.onPlayObj
    console.log(onPlayObj)
    if(this.props.keyValuesObj.length ==0){
        return 
    }
    let obj  = {}
    for(let b in bettingTools){
        if(bettingTools[b].id ==onPlayObj.id){
            obj.methdName = bettingTools[b].getAllValue(onPlayObj,keyValuesObj)
        }
    }
    if(this.state.mUnit ==2){
        obj.model = '元'   
    }
    if(this.state.mUnit ==0.2){
        obj.model = '角'   
    }
    if(this.state.mUnit ==0.02){
        obj.model = '分'   
    }
    obj.id = onPlayObj.id
    obj.values = keyValuesObj
    obj.onPlayObj = onPlayObj
    obj.bettingNum = this.props.bettingValueObj
    obj.mUltiple = this.state.mUltiple
    obj.Amount = this.props.bettingValueObj*this.state.mUltiple*(this.state.mUnit*100)/100

    let parms = []
    let data= {}
    for(let b in bettingTools){
        if(bettingTools[b].id ==obj.id){
             data.bet_number = bettingTools[b].getBettingValue(obj.onPlayObj.method_config,obj.values)
        }
    }
    data.bet_code = obj.onPlayObj.method_code
    data.bet_count = obj.bettingNum
    data.estimate_win_price = 1950*100/~~obj.onPlayObj.method_factor*obj.mUltiple.toFixed(4)
    data.ip= '127.0.0.1'
    data.issue_code = issueCode.result.issue
    data.issue_seq = 34
    data.lottery_code  = "cqssc"
    data.method_id = obj.onPlayObj.id
    data.modes = 0//圆角分
    data.multiple = obj.mUltiple
    data.platform_id = 1
    data.single_price = 2
    data.source_type = 0
    data.total_money = obj.Amount
    data.user_bonus_group = 1980
    data.user_id = 22
    data.user_rebate_rate = 7.5
    parms.push(data)
    axios.post(api.LOTTERY_BET_REQUEST, parms).then(res => {
        this.props.dispatch(changeKeyValues({keyValues:[]}))
        this.props.dispatch(getbettingValues({bettingValue:0}))
        this.props.dispatch(changeBatchStates({batchStates:[]}))
        console.log(res)
        if(res.data.result.code ==0){
            Modal.error({
                title: '投注通知',
                content: res.data.result.message
            });
        }else{
            Modal.success({
                title: '投注通知',
                content: '您的投注成功！'
            }); 
        }
    }).catch(e => {
    })
  }
  handleChangeSlider=(v)=>{
    this.setState({
        fandianValue:v
    })
    let factorrf = this.props.onPlayObj.method_factor
    // console.log(99999999999999)
    // console.log(factorrf.method_factor)
    // let huaValue = this.state.huaValue
    let fandian  = toPoint(fandianQuery(1950,~~factorrf,~~v).toFixed(4))
    let fandianValue = fandianQuery(1950,~~factorrf,~~v).toFixed(4)
    this.setState({
        fandianValuecont:fandianValue
    })
    this.setState({
        huaValue:fandian
    })
  }
  addBettingArray() {
    if(this.props.bettingValueObj ==0){
        return 
    }
    if(!this.iscommon()){
        message.error('您选择的号码在号码篮已存在，请重新选号！');
        return 
    }
    let allBettingValues = this.props.allBettingValues
    let keyValuesObj = this.props.keyValuesObj
    let onPlayObj = this.props.onPlayObj
    console.log(onPlayObj)
    let obj  = {}
    for(let b in bettingTools){
        if(bettingTools[b].id ==onPlayObj.id){
            obj.methdName = bettingTools[b].getAllValue(onPlayObj,keyValuesObj)
        }
    }
    if(this.state.mUnit ==2){
        obj.model = '元'   
    }
    if(this.state.mUnit ==0.2){
        obj.model = '角'   
    }
    if(this.state.mUnit ==0.02){
        obj.model = '分'   
    }
    obj.id = onPlayObj.id
    obj.values = keyValuesObj
    obj.onPlayObj = onPlayObj
    obj.bettingNum = this.props.bettingValueObj
    obj.mUltiple = this.state.mUltiple
    obj.Amount = this.props.bettingValueObj*this.state.mUltiple*(this.state.mUnit*100)/100
    obj.keyingValue = this.state.fandianValue*(this.state.mUnit/2)*obj.mUltiple - obj.Amount
    let newArray = allBettingValues.concat()
    newArray.push(obj)
    this.props.dispatch(addAllValues({allValues:newArray}))
    this.props.dispatch(changeKeyValues({keyValues:[]}))
    this.props.dispatch(getbettingValues({bettingValue:0}))
    this.props.dispatch(changeBatchStates({batchStates:[]}))
  }
  
  render() {
    const { homeRows } = this.props.homeRows
    let  factor = this.props.onPlayObj?~~this.props.onPlayObj.method_factor:1
    const mix1 = parseInt(1700*100/factor)
    const max1 = parseInt(1950*100/factor)
    const mix = this.state.min
    const max = this.state.max
    const { getFieldDecorator } = this.props.form
    return (
      <div className="betting-panel container">
        <div className="row  col-md-9">
        <div className="row betting-div col-md-12">
            <div className="panel panel-default">
                <div className="panel-body">
                    {this.playGroupList()}
                    <br/>
                    <br/>
                    {this.state.playGroupListId}
                    <br/>
                </div>
            </div>
        </div>
        {this.getStyle()}
        <div className="row betting-div col-md-12">
          <div className="panel panel-default nobor">
              <div className="panel-body nogrg">
                  <div className="btn-group btn-group-sm">
                      <button type="button" onClick={this.clickUnite.bind(this,2)}  className={this.state.mUnit ==2?"btn btn-default bg-red":"btn btn-default"}>元</button>
                      <button type="button" onClick={this.clickUnite.bind(this,0.2)} className={this.state.mUnit ==0.2?"btn btn-default bg-red":"btn btn-default"}>角</button>
                      <button type="button" onClick={this.clickUnite.bind(this,0.02)} className={this.state.mUnit ==0.02?"btn btn-default bg-red":"btn btn-default"}>分</button>
                  </div>
                  <div className="btn-group btn-group-sm">
                    <InputNumber min={1} max={10000} defaultValue={1} onChange={this.handleChange} />
                      倍 
                  </div>
                    <div className="btn-group">
                        <ul className="list-inline hth6yt">
                          <li><span>返点</span></li>
                          <li>{this.state.huaValue}</li>
                          <li className="g5thy"><Slider  onChange={this.handleChangeSlider} value={this.state.fandianValue} min={mix} max={max} /></li>
                          <li><span>{this.state.fandianValue*(this.state.mUnit/2)}元</span></li>
                          <li><span>奖金</span></li>
                        </ul>
                   </div>
                   <div className="panel-body nogrg">
                        <span className="jiane-ge">
                            已选 {this.props.bettingValueObj} 注，返还{(this.props.bettingValueObj*this.state.mUltiple*(this.state.mUnit*100)/100*this.state.fandianValuecont).toFixed(4)}元，共{this.props.bettingValueObj*this.state.mUltiple*(this.state.mUnit*100)/100}元 
                        </span>
                        {this.touzhuButton()}
                    </div>
              </div>
          </div>
        </div>
        </div>
        <div className="col-md-3 touzhu-right">
            <div className="panel panel-primary">
                <div className="panel-body ">
                    <table className="table table-bordered jiang-f">
                        <thead>
                            <tr>
                                <th>奖期</th>
                                <th>开奖</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.nashaList()}
                        </tbody>
                    </table>
                    <p>
                        <a>查看完整走势</a>
                    </p>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
