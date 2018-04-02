
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
    caizhongType:state.caizhongType
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
    }
  }
  componentDidMount() {
   
  }
  playGroupClick(groupId){
    const caizhongTypeId = this.props.caizhongType
    const rows = this.props.homeRows.result?this.props.homeRows.result.rows:[]
    let array = []
    if(rows.length>0){
        for(let r in rows){
            if(rows[r].id == caizhongTypeId){
                for(let rs in rows[r].playGroupList){
                    if(rows[r].playGroupList[rs].id == groupId){
                        for(let y in rows[r].playGroupList[rs].playList){
                            let buttons = []
                            for(let tr in rows[r].playGroupList[rs].playList[y].methodList){
                                buttons.push(
                                    <button type="button" key={rows[r].playGroupList[rs].playList[y].methodList[tr].id} className="btn btn-default"> {rows[r].playGroupList[rs].playList[y].methodList[tr].method_name}</button>
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
     // const numbers = props.numbers;
    if(rows.length>0){
        for(let r in rows){
            if(rows[r].id == caizhongTypeId){
                id = rows[r].id
                for(let rs in rows[r].playGroupList){
                    // if(rs ==0){
                    //    this.playGroupClick(1)
                    // }
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
  playList(){
    const playGroupList = this.state.playGroupList
    const rows = this.props.homeRows.result?this.props.homeRows.result.rows:[]
    let arras = []
     // const numbers = props.numbers;
    if(rows.length>0){
        for(let r in rows){
            if(rows[r].id == caizhongTypeId){
                for(let rs in rows[r].playGroupList){
                    console.log(rows[r].playGroupList[rs])
                    arras.push(
                        <button type="button" className="btn btn-default" key={rows[r].playGroupList[rs].id}> {rows[r].playGroupList[rs].cn_name}</button>
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
  render() {
    const { homeRows } = this.props.homeRows
    const { getFieldDecorator } = this.props.form
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
            <div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>百位</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-b">0</span>
                    <span className="chiose-no-b">1</span>
                    <span className="chiose-no-b">2</span>
                    <span className="chiose-no-b">3</span>
                    <span className="chiose-no-b">4</span>
                    <span className="chiose-no-b">5</span>
                    <span className="chiose-no-b">6</span>
                    <span className="chiose-no-b">7</span>
                    <span className="chiose-no-b">8</span>
                    <span className="chiose-no-b">9</span>
                </div>
                <div className="col-md-4 freg">
                  <div className="btn-group btn-group-xs ">
                    <button type="button" className="btn chiose-no-c btn-default">全</button>
                    <button type="button" className="btn chiose-no-c btn-default">大</button>
                    <button type="button" className="btn chiose-no-c btn-default">小</button>
                    <button type="button" className="btn chiose-no-c btn-default">奇</button>
                    <button type="button" className="btn chiose-no-c btn-default">偶</button>
                    <button type="button" className="btn chiose-no-c btn-default">清</button>
                  </div>
                </div>
            </div>

            <div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>冷热</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-d">0</span>
                    <span className="chiose-no-d">1</span>
                    <span className="chiose-no-d">2</span>
                    <span className="chiose-no-d">3</span>
                    <span className="chiose-no-d">4</span>
                    <span className="chiose-no-d">5</span>
                    <span className="chiose-no-d">6</span>
                    <span className="chiose-no-d">7</span>
                    <span className="chiose-no-d">8</span>
                    <span className="chiose-no-d">9</span>
                </div>
            </div>
            <div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>百位</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-b">0</span>
                    <span className="chiose-no-b">1</span>
                    <span className="chiose-no-b">2</span>
                    <span className="chiose-no-b">3</span>
                    <span className="chiose-no-b">4</span>
                    <span className="chiose-no-b">5</span>
                    <span className="chiose-no-b">6</span>
                    <span className="chiose-no-b">7</span>
                    <span className="chiose-no-b">8</span>
                    <span className="chiose-no-b">9</span>
                </div>
                <div className="col-md-4 freg">
                  <div className="btn-group btn-group-xs ">
                    <button type="button" className="btn chiose-no-c btn-default">全</button>
                    <button type="button" className="btn chiose-no-c btn-default">大</button>
                    <button type="button" className="btn chiose-no-c btn-default">小</button>
                    <button type="button" className="btn chiose-no-c btn-default">奇</button>
                    <button type="button" className="btn chiose-no-c btn-default">偶</button>
                    <button type="button" className="btn chiose-no-c btn-default">清</button>
                  </div>
                </div>
            </div>

            <div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>冷热</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-d">0</span>
                    <span className="chiose-no-d">1</span>
                    <span className="chiose-no-d">2</span>
                    <span className="chiose-no-d">3</span>
                    <span className="chiose-no-d">4</span>
                    <span className="chiose-no-d">5</span>
                    <span className="chiose-no-d">6</span>
                    <span className="chiose-no-d">7</span>
                    <span className="chiose-no-d">8</span>
                    <span className="chiose-no-d">9</span>
                </div>
            </div>
            <div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>百位</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-b">0</span>
                    <span className="chiose-no-b">1</span>
                    <span className="chiose-no-b">2</span>
                    <span className="chiose-no-b">3</span>
                    <span className="chiose-no-b">4</span>
                    <span className="chiose-no-b">5</span>
                    <span className="chiose-no-b">6</span>
                    <span className="chiose-no-b">7</span>
                    <span className="chiose-no-b">8</span>
                    <span className="chiose-no-b">9</span>
                </div>
                <div className="col-md-4 freg">
                  <div className="btn-group btn-group-xs ">
                    <button type="button" className="btn chiose-no-c btn-default">全</button>
                    <button type="button" className="btn chiose-no-c btn-default">大</button>
                    <button type="button" className="btn chiose-no-c btn-default">小</button>
                    <button type="button" className="btn chiose-no-c btn-default">奇</button>
                    <button type="button" className="btn chiose-no-c btn-default">偶</button>
                    <button type="button" className="btn chiose-no-c btn-default">清</button>
                  </div>
                </div>
            </div>

            <div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>冷热</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-d">0</span>
                    <span className="chiose-no-d">1</span>
                    <span className="chiose-no-d">2</span>
                    <span className="chiose-no-d">3</span>
                    <span className="chiose-no-d">4</span>
                    <span className="chiose-no-d">5</span>
                    <span className="chiose-no-d">6</span>
                    <span className="chiose-no-d">7</span>
                    <span className="chiose-no-d">8</span>
                    <span className="chiose-no-d">9</span>
                </div>
            </div>
            <div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>百位</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-b">0</span>
                    <span className="chiose-no-b">1</span>
                    <span className="chiose-no-b">2</span>
                    <span className="chiose-no-b">3</span>
                    <span className="chiose-no-b">4</span>
                    <span className="chiose-no-b">5</span>
                    <span className="chiose-no-b">6</span>
                    <span className="chiose-no-b">7</span>
                    <span className="chiose-no-b">8</span>
                    <span className="chiose-no-b">9</span>
                </div>
                <div className="col-md-4 freg">
                  <div className="btn-group btn-group-xs ">
                    <button type="button" className="btn chiose-no-c btn-default">全</button>
                    <button type="button" className="btn chiose-no-c btn-default">大</button>
                    <button type="button" className="btn chiose-no-c btn-default">小</button>
                    <button type="button" className="btn chiose-no-c btn-default">奇</button>
                    <button type="button" className="btn chiose-no-c btn-default">偶</button>
                    <button type="button" className="btn chiose-no-c btn-default">清</button>
                  </div>
                </div>
            </div>

            <div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>冷热</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-d">0</span>
                    <span className="chiose-no-d">1</span>
                    <span className="chiose-no-d">2</span>
                    <span className="chiose-no-d">3</span>
                    <span className="chiose-no-d">4</span>
                    <span className="chiose-no-d">5</span>
                    <span className="chiose-no-d">6</span>
                    <span className="chiose-no-d">7</span>
                    <span className="chiose-no-d">8</span>
                    <span className="chiose-no-d">9</span>
                </div>
            </div><div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>百位</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-b">0</span>
                    <span className="chiose-no-b">1</span>
                    <span className="chiose-no-b">2</span>
                    <span className="chiose-no-b">3</span>
                    <span className="chiose-no-b">4</span>
                    <span className="chiose-no-b">5</span>
                    <span className="chiose-no-b">6</span>
                    <span className="chiose-no-b">7</span>
                    <span className="chiose-no-b">8</span>
                    <span className="chiose-no-b">9</span>
                </div>
                <div className="col-md-4 freg">
                  <div className="btn-group btn-group-xs ">
                    <button type="button" className="btn chiose-no-c btn-default">全</button>
                    <button type="button" className="btn chiose-no-c btn-default">大</button>
                    <button type="button" className="btn chiose-no-c btn-default">小</button>
                    <button type="button" className="btn chiose-no-c btn-default">奇</button>
                    <button type="button" className="btn chiose-no-c btn-default">偶</button>
                    <button type="button" className="btn chiose-no-c btn-default">清</button>
                  </div>
                </div>
            </div>

            <div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>冷热</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-d">0</span>
                    <span className="chiose-no-d">1</span>
                    <span className="chiose-no-d">2</span>
                    <span className="chiose-no-d">3</span>
                    <span className="chiose-no-d">4</span>
                    <span className="chiose-no-d">5</span>
                    <span className="chiose-no-d">6</span>
                    <span className="chiose-no-d">7</span>
                    <span className="chiose-no-d">8</span>
                    <span className="chiose-no-d">9</span>
                </div>
            </div><div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>百位</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-b">0</span>
                    <span className="chiose-no-b">1</span>
                    <span className="chiose-no-b">2</span>
                    <span className="chiose-no-b">3</span>
                    <span className="chiose-no-b">4</span>
                    <span className="chiose-no-b">5</span>
                    <span className="chiose-no-b">6</span>
                    <span className="chiose-no-b">7</span>
                    <span className="chiose-no-b">8</span>
                    <span className="chiose-no-b">9</span>
                </div>
                <div className="col-md-4 freg">
                  <div className="btn-group btn-group-xs ">
                    <button type="button" className="btn chiose-no-c btn-default">全</button>
                    <button type="button" className="btn chiose-no-c btn-default">大</button>
                    <button type="button" className="btn chiose-no-c btn-default">小</button>
                    <button type="button" className="btn chiose-no-c btn-default">奇</button>
                    <button type="button" className="btn chiose-no-c btn-default">偶</button>
                    <button type="button" className="btn chiose-no-c btn-default">清</button>
                  </div>
                </div>
            </div>

            <div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>冷热</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-d">0</span>
                    <span className="chiose-no-d">1</span>
                    <span className="chiose-no-d">2</span>
                    <span className="chiose-no-d">3</span>
                    <span className="chiose-no-d">4</span>
                    <span className="chiose-no-d">5</span>
                    <span className="chiose-no-d">6</span>
                    <span className="chiose-no-d">7</span>
                    <span className="chiose-no-d">8</span>
                    <span className="chiose-no-d">9</span>
                </div>
            </div><div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>百位</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-b">0</span>
                    <span className="chiose-no-b">1</span>
                    <span className="chiose-no-b">2</span>
                    <span className="chiose-no-b">3</span>
                    <span className="chiose-no-b">4</span>
                    <span className="chiose-no-b">5</span>
                    <span className="chiose-no-b">6</span>
                    <span className="chiose-no-b">7</span>
                    <span className="chiose-no-b">8</span>
                    <span className="chiose-no-b">9</span>
                </div>
                <div className="col-md-4 freg">
                  <div className="btn-group btn-group-xs ">
                    <button type="button" className="btn chiose-no-c btn-default">全</button>
                    <button type="button" className="btn chiose-no-c btn-default">大</button>
                    <button type="button" className="btn chiose-no-c btn-default">小</button>
                    <button type="button" className="btn chiose-no-c btn-default">奇</button>
                    <button type="button" className="btn chiose-no-c btn-default">偶</button>
                    <button type="button" className="btn chiose-no-c btn-default">清</button>
                  </div>
                </div>
            </div>

            <div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>冷热</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-d">0</span>
                    <span className="chiose-no-d">1</span>
                    <span className="chiose-no-d">2</span>
                    <span className="chiose-no-d">3</span>
                    <span className="chiose-no-d">4</span>
                    <span className="chiose-no-d">5</span>
                    <span className="chiose-no-d">6</span>
                    <span className="chiose-no-d">7</span>
                    <span className="chiose-no-d">8</span>
                    <span className="chiose-no-d">9</span>
                </div>
            </div><div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>百位</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-b">0</span>
                    <span className="chiose-no-b">1</span>
                    <span className="chiose-no-b">2</span>
                    <span className="chiose-no-b">3</span>
                    <span className="chiose-no-b">4</span>
                    <span className="chiose-no-b">5</span>
                    <span className="chiose-no-b">6</span>
                    <span className="chiose-no-b">7</span>
                    <span className="chiose-no-b">8</span>
                    <span className="chiose-no-b">9</span>
                </div>
                <div className="col-md-4 freg">
                  <div className="btn-group btn-group-xs ">
                    <button type="button" className="btn chiose-no-c btn-default">全</button>
                    <button type="button" className="btn chiose-no-c btn-default">大</button>
                    <button type="button" className="btn chiose-no-c btn-default">小</button>
                    <button type="button" className="btn chiose-no-c btn-default">奇</button>
                    <button type="button" className="btn chiose-no-c btn-default">偶</button>
                    <button type="button" className="btn chiose-no-c btn-default">清</button>
                  </div>
                </div>
            </div>

            <div className="col-md-12 chiose-no">
                <div className="col-md-1">
                    <span>冷热</span>
                </div>
                <div className="col-md-7">
                    <span className="chiose-no-d">0</span>
                    <span className="chiose-no-d">1</span>
                    <span className="chiose-no-d">2</span>
                    <span className="chiose-no-d">3</span>
                    <span className="chiose-no-d">4</span>
                    <span className="chiose-no-d">5</span>
                    <span className="chiose-no-d">6</span>
                    <span className="chiose-no-d">7</span>
                    <span className="chiose-no-d">8</span>
                    <span className="chiose-no-d">9</span>
                </div>
            </div>
        </div>
    )
  }
}
