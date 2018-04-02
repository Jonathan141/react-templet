
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Spin, message, Form, Icon, Input, Button, Row, Col } from 'antd'
import { fetchLogin } from 'actions/common'
import { Progress,Alert  }  from 'antd';
import * as api from "api/url";
import axios from 'axios'
import './index.less'
const FormItem = Form.Item

function NumberList(props) {
  
}
@connect(
  (state, props) => ({
    config: state.config
  })
)
@Form.create({
  onFieldsChange(props, items) {
    // console.log(items)
    // props.cacheSearch(items);
  },
})

export default class Speed extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
      value:null,
      isOk:false,
      numbers:[
        // {
        //   url:'http://www.baidu.com',
        //   time:0,
        //   d1:0,
        //   d2:0
        // },
        // {
        //   url:'http://news.cctv.com',
        //   time:0,
        //   d1:0,
        //   d2:0
        // },
        // {
        //   url:'https://web.telegram.org',
        //   time:0
        // },
        // {
        //   url:'http://frfrewf.com/',
        //   time:0
        // },
        // {
        //   url:'/',
        //   time:0
        // },
      ]
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
  setNetwork(data){
    var temp = this
    var numbers = data
    for(let i in numbers){
      var date1=new Date();
      axios.get(numbers[i].url)
      .then(function (response) {
        var date2=new Date();
        var date3=date2.getTime()-date1.getTime()
        numbers[i].time = date3
        temp.setState({numbers:numbers});
      })
      .catch(function (error) {
        var date2=new Date();
        var date3=date2.getTime()-date1.getTime()
        numbers[i].time = date3
        console.log(date3);
        temp.setState({numbers:numbers});
      });
    }
  }
  handleChange(e) {
    console.log(e)
    const newState = {}
    newState[e.target.name] = e.target.value
    console.log(newState)
    this.setState(newState)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    axios.get(api.GET_DOMAIN)
      .then(res => {
        let numbers = []
        this.state.fname = res.data.result.rows[0].domain_name
        for(let i in res.data.result.rows){
          let obj = {}
          obj.name =  res.data.result.rows[i].domain_desc
          obj.url = 'http://'+ res.data.result.rows[i].domain_name
          obj.d1 = 0
          obj.d2 = 0
          obj.time = 0
          numbers.push(obj)
        }
      this.setState({numbers:numbers})
      this.setNetwork(numbers)
      // hashHistory.push('/home')
    }).catch(e => {
        this.setState({
          loading:false,
          status:false,
          msg:e
        })
    })

    
    // this.props.dispatch(fetchLogin({ currentPage: 1 }))

  }
  getNetWorkList(){
    var listItems = null
    let numbers = this.state.numbers
    if(numbers.length == 0 ){
      listItems = <div className="alert alert-info">正在获取线路列表。。。。</div>
    }else{
      listItems = numbers.map((number) =>
        <div className="xian-box col-xs-6 col-sm-3" key={number.url.toString()}>
            <div className="row-text">
                <span className="text-left">
                  {number.name}
                </span>
                <span className="text-right">
                  {number.time==0?'正好在测速。。。':'速度：'+number.time/10+'ms'}
                </span>
            </div>
            <div className="row-text">
                 <Progress percent={~~number.time>2275?100:~~number.time/2275 * 100} showInfo={false} />
            </div>
            <a href={number.url}><button type="button" className="btn btn-sm btn-info">立即访问</button></a>
        </div>
      );
    }
    return (
        <div className="xian-lu row">
            {listItems}
        </div> 
    );
  }
  showFalgValue(){
    let text  =  '此域名'
    let yes = "请注意,"+text+"未通过验证！"
    let no = "恭喜，"+text+"通过验证！"
    if(this.state.isOk){
      return <Alert message={yes} type="error" showIcon/>
    }else{
      return <Alert message={no} type="success" showIcon/>
    }
  }
  checkName() {
    axios.get(api.CHECK_DOMAIN + this.state.fname + '/check')
      .then(res => {
        console.log(res)
        if(res.data.rows.length==0){
          this.setState({isOk:true})
        }else{
          this.setState({isOk:false})
        }
        
      // hashHistory.push('/home')
    }).catch(e => {
        this.setState({isOk:false})
    })
  }

  checkPass() {
    
  }

  noop() {
    return false
  }

  render() {
    const numbers = this.state.numbers;
    return (
      <div className="speed container">
        <h1>域名检测中心</h1>
        {this.getNetWorkList()}
        
        <div className="lined text-center row">
            <a href={numbers.length>0?numbers[0].url:''}><button type="button" className="btn btn-sm btn-primary">一键访问最快域名</button></a>
        </div>
        <div className="lined text-center row">
            <span>访问状态说明：&nbsp; &nbsp; &nbsp; 很好<span className="glyphicon glyphicon-stop good"></span>&nbsp; &nbsp; &nbsp; &nbsp; 一般<span className="glyphicon glyphicon-stop yiban"></span>&nbsp; &nbsp; &nbsp; &nbsp; 较差<span className="glyphicon bad glyphicon-stop"></span></span>
        </div>
        <div className="linedhty text-center row">
            <h4>域名检测</h4>
            <p><span>为了帮助您更好的识别本平台的真实域名，除了直接点击页面上方的【立即登入】之外，您还可以将域名复制到下方进行验证，只需在输入框中输入要验证的域名，便可轻松辨别真伪。</span></p>
        </div>
        <div className="linedhty text-center row">
        {this.showFalgValue()}
          
            <label>检测域名</label>
            <input type="text" name="fname" value={this.state.fname} onChange={this.handleChange}/>
            <button type="button" onClick={this.checkName.bind(this)} className="btn btn-primary">提交</button>
        </div>
      </div>
    )
  }
}
