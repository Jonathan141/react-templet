import React from 'react'
import {
  Route,
  IndexRoute,
} from 'react-router'
import App from './containers/App'
import Welcome from './pages/welcome'
// import Login from './containers/App/login'

// import {
//   houseCheck,
//   houseManage,
//   houseDetail,
//   roomDetail,
// } from './pages/house'

// import popCheck from './pages/pop/index'

// 表格列表
const table = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/menu/table').default)
  }, 'table')
}

// 表格列表
const table1 = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/menu/table1').default)
  }, 'table1')
}

// 表格列表
const table2 = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/menu/table2').default)
  }, 'table2')
}

// 表格列表
const table3 = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/menu/table3').default)
  }, 'table3')
}

// 图表
const echarts = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/menu/echarts').default)
  }, 'echarts')
}

// 登录
const Login = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/login').default)
  }, 'login')
}

const Regist = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/regist').default)
  }, 'regist')
}

const Speed = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/speed').default)
  }, 'speed')
}
const Home = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/home').default)
  }, 'home')
}
const Betting = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/home/betting').default)
  }, 'betting')
}
const Center = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/home/mycenter').default)
  }, 'mycenter')
}
const Notifications = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/home/mycenter/notifications').default)
  }, 'notifications')
}





// 测试
const chat = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/chat').default)
  }, 'chat')
}
// 编辑器
const editor = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/menu/editor').default)
  }, 'editor')
}

// kindEditor
const kindEditor = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/menu/kindEditor').default)
  }, 'kindEditor')
}

/* 进入路由的判断*/
function isLogin(nextState, replaceState) {
  const token = sessionStorage.getItem('token')
  if (!token) {
    replaceState('/login')
    // hashHistory.push('/login')
  }
}

const routes = (
  <Route>
    <Route path="/" getComponent={Home} onEnter={isLogin}>
      <IndexRoute component={Welcome} />
      <Route path="/betting" getComponent={Betting} />
      <Route path="/center" getComponent={Center}>
          <Route path="/notifications" getComponent={Notifications} />
      </Route>
    </Route>
    <Route path="/table2" getComponent={table2}></Route>
    <Route path="/regist" getComponent={Regist}></Route>
    <Route path="/login" getComponent={Login}></Route>
    <Route path="/speed" getComponent={Speed}></Route>
  </Route>
);

export default routes
