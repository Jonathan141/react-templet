
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Spin, message, Form, Icon, Input, Button, Row, Col , Menu, Table } from 'antd'
// import { fetchLogin } from 'actions/common'
import logo from 'img/u170.jpg'
import * as api from "api/url"
import axios from 'axios'
import './index.less'
const FormItem = Form.Item
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup;
const columns = [{
  title: '发件人',
  key: 'name',
  dataIndex: 'name'
}, {
  title: '主题名',
  key: 'title',
  dataIndex: 'title'
}, {
  title: '发送时间',
  key: 'time',
  dataIndex: 'time'
},{
  title: '状态',
  key: 'status',
  dataIndex: 'status'
},{
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">删除</a>
      <a href="#">  </a>
      <a href="#">阅读</a>
    </span>
  )
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    title:'jibaba',
    time: 'you know',
    status: 'true',
    operate: `London, Park Lane no. ${i}`,
  });
}
@connect(
  (state, props) => ({
    config: state.config,
    loginResponse: state.loginResponse,
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
      pageNum:1,
      pageSize:10,
      data: []
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

  // 组件已经加载到dom中
  componentDidMount() {
    let pageNum = this.state.pageNum
    let pageSize = this.state.pageSize
    axios.get(api.PLATFORM_MAIL + pageNum + '/' + pageSize )
      .then(res => {
        console.log(res)
        let rows = res.result.rows
        for(let r in rows){
          this.state.data.push({
            key: rows[r].id,
            name: rows[r].send_user,
            title:rows[r].mail_subject,
            time: rows[r].send_time,
            status: rows[r].isread,
            operate: `London, Park Lane no. ${i}`,
          });
        }
        console.log(this.state.data)
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

  checkName(rule, value, callback) {
    // const { validateFields } = this.props.form
    if (value) {
      // validateFields([''])
    }
    callback()
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  checkPass(rule, value, callback) {
    // const { validateFields } = this.props.form
    if (value) {
      // validateFields([''])
    }
    callback()
  }
  handleClick = (e) => {
    console.log('click ', e);
  }
  noop() {
    return false
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...Array(46).keys()], // 0...45
          });
        },
      }, {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }],
      onSelection: this.onSelection,
    };
    return (

      <div className="fdfqreg-panel">
        <div className="panel panel-default">
         
          <ol className="breadcrumb">
              <li><a href="#">站内信</a></li>
          </ol>
          <div className="panel-body">
            <div className="btn-group">
              <button type="button" className="btn btn-default">收件箱</button>
              <button type="button" className="btn btn-default">发件箱</button>
              <button type="button" className="btn btn-default">发邮件</button>
            </div>
          </div>
          <div className="panel-footer">
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
            <div className="btn-group">
              <button type="button" className="btn btn-default">标记已读</button>
              <button type="button" className="btn btn-default">批量删除</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
