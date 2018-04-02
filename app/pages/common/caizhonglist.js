
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { Menu, Dropdown, Button, Modal, message } from 'antd'
import * as api from "api/url";
import axios from "api/axios";
import logo from 'img/u170.jpg'
import './caizhonglist.less'
import {
  requestCaizhongId,getCaizhongObj
} from 'actions/home'

@connect(
  (state, props) => ({
    config: state.config,
    homeRows: state.homeRows,
  })
)
export default class CaizhongList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
      rows:[]
    }
  }
  handleClick(obj){
    this.props.dispatch(requestCaizhongId({caizhongId:obj.id}))
    this.props.dispatch(getCaizhongObj({caizhongObj:obj}))
  }
  menueList() {
    const numbers = this.props.homeRows.result?this.props.homeRows.result.rows:[]
     // const numbers = props.numbers;
    if(numbers.length>0){
      let ryrghrth = []
      for(let n in numbers){
        ryrghrth.push(
          <li key={numbers[n].id}>
              <a><span onClick={this.handleClick.bind(this, numbers[n])}>{numbers[n].cn_name}<i className="ico ico-hot"></i></span></a>
          </li>
        )
      }
      return (
        <ul className="j-list clearfix yhhjuj">{ryrghrth}</ul>
      );
    }else{
      return (
        <ul className="j-list clearfix"></ul>
      );
    }
  }
  render() {
    return (
      <div id="menue" className="it">
          <a className="mu-big" href="#">彩票<span className="sj"></span></a>
              <div className="panel-menu">
                  <span className="p-sj"></span>
                      <div className="row">
                          <div className="menu-table">
                              <div className="menu-row">
                                  <div className="menu-cell">
                                      <div className="sprite sprite-ssc"></div>
                                  </div>
                                  <div className="menu-cell">
                                    {this.menueList()}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
      </div>
    )
  }
}
