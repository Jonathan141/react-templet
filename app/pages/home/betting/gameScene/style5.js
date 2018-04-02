
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Spin, message, Form, Icon, Input, Button, Row, Col } from 'antd'
// import { fetchLogin } from 'actions/common'
import logo from 'img/u170.jpg'
import './style5.less'
import {
    changeKeyValues,getbettingValues,changeBatchStates
} from 'actions/home'
const FormItem = Form.Item
@connect(
  (state, props) => ({
    config: state.config,
    homeRows: state.homeRows,
    caizhongType:state.caizhongType,
    uiStyleObj:state.uiStyleObj,
    keyValuesObj:state.keyValuesObj,
    batchStatesArray:state.batchStatesArray,
    bettingValueObj:state.bettingValueObj
  })
)

export default class Style1 extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
      values:null,
      gfrrState:[1,2,3,4,5,6],

    }
  }
  componentDidMount() {
    let valueObj = this.props.keyValuesObj
    this.setState({
      values:valueObj
    })
  }
  clickOnValue(col,row){
    let valueObj = this.getOnValue(col,row)
    let uiObj = this.props.uiStyleObj
    this.setState({
      values:valueObj
    })
    let bettingValueObj = uiObj.getBettingNums(valueObj)
    this.props.dispatch(getbettingValues({bettingValue:bettingValueObj}))
    this.props.dispatch(changeKeyValues({keyValues:valueObj}))
  }
 getOnValue (col,row){
    // let cArray = this.state.gfrrState
    let cArray =this.props.batchStatesArray
    let valueObj = this.props.keyValuesObj
    cArray[row] = '1'
    this.props.dispatch(changeBatchStates({batchStates:cArray}))
    // this.setState({
    //     gfrrState:cArray
    // })
    let key = col+'-'+row
    let value = col+''+row
    let falg = false
    for(let v in valueObj){
      if(valueObj[v].key == key){
        falg = true
        valueObj.splice(v,1)
        break
      }
    }
    if(!falg){
      let obj = {
        key:key,
        value:value
      }
      valueObj.push(obj)
    }
    return valueObj
  }
  clickOnValue1(col,row){
    let valueObj = this.getOnValue1(col,row)
    let uiObj = this.props.uiStyleObj
    this.setState({
      values:valueObj
    })
    let bettingValueObj = uiObj.getBettingNums(valueObj)
    this.props.dispatch(getbettingValues({bettingValue:bettingValueObj}))
    this.props.dispatch(changeKeyValues({keyValues:valueObj}))
  }
  getOnValue1(col,row){
    let valueObj = this.props.keyValuesObj
    let key = col+'-'+row
    let value = col+''+row
    let falg = false
    for(let v in valueObj){
      if(valueObj[v].key == key){
        falg = true
        break
      }
    }
    if(!falg){
      let obj = {
        key:key,
        value:value
      }
      valueObj.push(obj)
    }
    return valueObj
  }
  setQiuqiuCol(col,row,st){
    let cols = []
    let valueObj = this.props.keyValuesObj
    for(let c=st;c<col;c++){
      let spana = null
      let falg = false
      for(let v in valueObj){
        if(valueObj[v].key == c+'-'+row){
          falg = true
          break
        }
      }
      cols.push(
          <span key={c} className={falg?'chiose-no-a':'chiose-no-h'} onClick={this.clickOnValue.bind(this,c,row)}>{c}</span>
      )
    }
    return (
      <div className="col-md-10">
        {cols}
      </div>
    )
  }
  cleanRows(c,r){
    let temp = this
    let valueObj = this.props.keyValuesObj
    let nrew = []
    for(let i=0;i<c;i++){
      for(let v in valueObj){
        if(valueObj[v].key.charAt(2)==r){
          valueObj.splice(v,1)
          break
        }
      }
    }
    
    this.setState({
      values:valueObj
    })
    return new Promise(function(resolve, reject) {
      temp.props.dispatch(changeKeyValues({keyValues:valueObj}))
      resolve('一块碗和一双筷子');
    });
  }
  qiliangSelect(a,c,r){
    let temp = this
    let cArray =this.props.batchStatesArray
    this.cleanRows(c,r).then(function(){
      if(a=='ALL'){
        cArray[r] = 'ALL'
        for(let i=0;i<c;i++){
          // this.setState({
          //   gfrrState:cArray
          // })
          temp.props.dispatch(changeBatchStates({batchStates:cArray}))
          temp.clickOnValue1(i,r)
        }
      }
      if('BIG'==a){
        let carray = []
        cArray[r] = 'BIG'
        for(let i=0;i<c;i++){
          if(i>c/2-1){
            carray.push(i+'-'+r)
            temp.clickOnValue1(i,r)
          }
        }
      }
      if('SMALL'==a){
        cArray[r] = 'SMALL'
        for(let i=0;i<c;i++){
          if(i<c/2){
            temp.clickOnValue1(i,r)
          }
        }
      }
      if('ODD' ==a){
        cArray[r] = 'ODD'
        for(let i=0;i<c;i++){
          if(i%2){
            temp.clickOnValue1(i,r)
          }
        }
      }
      if('EVEN' ==a){
        cArray[r] = 'EVEN'
        for(let i=0;i<c;i++){
          if(i%2==0){
            temp.clickOnValue1(i,r)
          }
        }
      }
      if('CLEAN' ==a){
        cArray[r] = 'CLEAN'
        temp.cleanRows(c,r)
      }
    })
  }
  setQiuqiuRow(){
    let uiObj = this.props.uiStyleObj
    let rows = []
    for(let r =0;r<uiObj.row;r++){
        rows.push(
            <div key={r} className="col-md-12 chiose-no">
                <div className="col-md-2 text-center">
                    <span className="text-center">{uiObj.row_title[r]}</span>
                </div>
                {this.setQiuqiuCol(uiObj.col,r,uiObj.start)}
            </div>
        )
    }
    return (rows)
  }
  render(){
    return (
        <div className="row betting-div col-md-12">
            <div className="col-md-4">
                <div className="btn-group btn-group-xs text-center">
                  <button type="button" className="btn btn-default">遗漏</button>
                  <button type="button" className="btn btn-default">冷热</button>
                </div>
            </div>
            <div className="col-md-8 grtght">
                <div className="btn-group text-center">
                  <button type="button" className="btn btn-default">30期</button>
                  <button type="button" className="btn btn-default">50期</button>
                  <button type="button" className="btn btn-default">100期</button>
                </div>
            </div>
            {this.setQiuqiuRow()}
        </div>
    )
  }
}
