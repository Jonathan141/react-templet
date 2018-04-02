
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Spin, message, Form, Icon, Input, Button, Row, Col } from 'antd'
// import { fetchLogin } from 'actions/common'
import logo from 'img/u170.jpg'
import './index.less'
const FormItem = Form.Item
@connect(
  (state, props) => ({
    config: state.config,
    homeRows: state.homeRows,
    caizhongType:state.caizhongType,
    uiStyleObj:state.uiStyleObj
  })
)
export default class Style4 extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false
    }
  }
  componentDidMount() {
  }
  setQiuqiuCol(col){
    let cols = []
    for(let c=0;c<col;c++){
        cols.push(
            <span key={c} className="chiose-no-b">{viewKey[c]}</span>
        )
    }
    return (
      <div className="col-md-7">
        {cols}
      </div>
    )
  }
  setQiuqiuRow(){
    let uiObj = this.props.uiStyleObj
    let rows = []
    for(let r =0;r<uiObj.row;r++){
        rows.push(
            <div key={r} className="col-md-12 chiose-no">
                <div className="col-md-2">
                  <span className="text-center">{uiObj.row_title[r]}</span>
                </div>
                {this.setQiuqiuCol(uiObj.col)}
                <div className="col-md-3 freg">
                </div>
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
            <div className="container">
                <div className="row" >
                    <div className="col-xs-8 " >
                        <textarea className="content-textarea-balls content-textarea-balls-def" style={{margin: '0px', width: '650px', height: '200px',borderRadius: '10px',
    border: '1px solid #bcaaa4'}}>
                              请输入投注号码，按空格或回车键确认选号
                         </textarea>
                    </div>
                </div>
            </div>
            <div className="btn-group">
                <button type="button" className='btn btn-primary gregrg'   data-toggle="button"> 
                    <span class="glyphicon glyphicon-circle-arrow-up"></span>上传文件
                </button>
                <button type="button"  className='btn btn-default gregrg'   data-toggle="button"> 
                    清空
                </button>
           </div>
        </div>
    )
  }
}
