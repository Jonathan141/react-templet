# 前言

为什么选择react而不是vue也不是angular？

ng1.x我用过几个月，觉得整个框架的设计风格更加接近后端Java等开发人员的思想，

vue的1.x版本我也来做过一个小的项目，对比angular1.x，就是轻量，简洁，易上手；2.x风格更加偏向react，中文api文档非常友好，目前发展趋势也有跟react分庭抗礼的趋势，个人挺看好的，不过weex相对react-native来说还是太新了，所以保持观望

so，就是react啦


## 技术栈

react@16.0 + redux@3.7.2 + react-router@3.2.0 + webpack@3.10.0 + fetch@2.0.3 + less@2.7.1 + antd@3.1.3



## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本 ，建议使用 node 最新LTS版

```
git clone https://github.com/duxianwei520/react.git  

cd react （进入当前的项目）

npm install  (安装依赖包)

npm start (运行本地开发环境)

npm run build (打包)

另开启一个命令窗口 启动node的本地json数据代理服务

npm run mock (对，就是传说中的 mockjs http://highsea90.com/t/mock/)

想要体验聊天室功能  先开启socket服务 运行命令

npm run chat

```

对了，服务端返回的格式我们是这样子一个数据结构
```
{
  data: {
    totalCount: 100,
    currentPage: 1,
    pageSize: 10,
    'list': [
    ],
  },
  msg: '',
  status: 1,
}

```
所有异步请求返回都会经过utils里面的index.js做处理，如果请求没有任何问题，那status返回值是1；
如果请求错误，比如说参数错误或者其他报错之类的，那status返回值就是0；
如果status值是-1，表示登录超时，那么就会跳出登录。
这些参数都可以根据实际情况进行调整，报错或者成功的提示信息放在msg里面返回，
用户可以自己控制是否显示出来，详情实例参照mock/datas/tableList.js的数据返回格式



## 说明

>  喜欢的别忘记了可以star一下的噢！ 

>  开发环境 win10  Chrome 63.0.3239.132（正式版本） （32 位） nodejs 8.7.0

>  如果npm install太慢导致有些npm依赖包下载失败 你可以看控制台的报错信息，再手动npm install 具体的开发包，推荐使用淘宝的注册源，直接运行，

```
npm install -g cnpm --registry=https://registry.npm.taobao.org 

```

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍



## 功能一览
- [√] 项目按路由模块加载
- [√] 登录，以及登录权限控制
- [√] 退出
- [√] 欢迎主页
- [√] 左侧菜单，正常mini切换
- [√] redux完整示范
- [√] mockjs模拟后端返回接口
- [√] 页面高度flex自适应
- [√] fetch数据跨域的设置
- [√] 实时的webpack包大小预览,方便优化
- [√] draftjs编辑器
- [√] 聊天室



## 总结

1、这整个技术栈是我们公司前端部门在用的，写熟悉了之后，用来做后台管理系统类的实在是很方便，大家都表示再也不要用jQuery来做这样子的系统了

2、目前来说，不足的地方是在于没有很好的区分dev环境跟pro环境，这个后面弄好了再补充上来；mock数据现在还不是那么的方便，需要自己一个个的添加api的json文件



## 部分截图


### 列表页 mock数据返回

<img src="https://raw.githubusercontent.com/duxianwei520/react/master/screenshots/list.gif" width="1082" height="557"/>

### 图表

<img src="https://raw.githubusercontent.com/duxianwei520/react/master/screenshots/echart.gif" width="976" height="586"/>

### Facebook官方富文本编辑器draft.js

<img src="https://raw.githubusercontent.com/duxianwei520/react/master/screenshots/draft.gif" width="976" height="586"/>

### 聊天室

<img src="https://raw.githubusercontent.com/duxianwei520/react/master/screenshots/chat.gif" width="1331" height=""/>


### 构建完成的包的分析截图

<img src="https://raw.githubusercontent.com/duxianwei520/react/master/screenshots/analysis.png" width="1101" height="555"/>


## 项目结构

```


```
## License

[GPL](https://github.com/duxianwei520/react/blob/master/COPYING)


## 交流
想跟其他的使用react的小伙伴们交流的话，
可以加入我创建的reactQQ群：598372207~
