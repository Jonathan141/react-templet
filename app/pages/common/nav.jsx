import React, {Component, PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import { is, fromJS} from 'immutable';
import '../Style/head.less'

export default class NiMaBi extends Component {  //头部标题
     constructor(props,context) {
        super(props,context);
    }
    render() {
        return (
            <div className="layout-top">
                <div className="container">
                    <div className="inner clearfix">
                        <div className="left">
                            <div className="notice">
                                <a href="/pc-client/index.html">PC客户端</a>
                                &nbsp;&nbsp;
                                <a href="/mobile">手机客户端</a>
                                &nbsp;&nbsp;
                                <a href="/fastlogin/index.html">快速登录器</a>
                                &nbsp;&nbsp;
                                <a href="/events/repairDNS">防劫持教程</a>
                            </div>
                        </div>
                        <div className="right">
                            <ul>
                                <li>
                                    <a href="https://www.bomao88.com/activitylist" className="at">
                                        <i className="gift"></i>
                                        <span>活动专区</span>
                                    </a>
                                </li>
                                <li className="chat-message-box" >
                                    <a className="at chat-unread" href="/users/chat" target="_blank">&nbsp;</a>
                                    <span className="char-unread-num"></span>
                                </li>
                                <li>
                                    <a className="at r-email0203" href="/station-letters">&nbsp;</a>
                                </li>
                                <li className="mu mu-notice">
                                    <a className="at" href="javascript:;">平台公告</a>
                                    <div className="panel">
                                        <span className="p-sj"></span>
                                        <ul>
                                            <li><a href="https://www.bomao88.com/announcements/983/view"><i className="fa fa-angle-right"></i> [维护通知] 银联充值系统临时维护</a></li>
                                            <li><a href="https://www.bomao88.com/announcements/982/view"><i className="fa fa-angle-right"></i> [维护通知] 支付宝充值系统临时维护</a></li>
                                            <li><a href="https://www.bomao88.com/announcements/962/view"><i className="fa fa-angle-right"></i> QQ钱包充值额度调整</a></li>
                                            <li><a href="https://www.bomao88.com/announcements/972/view"><i className="fa fa-angle-right"></i> 博猫官方严正声明</a></li>
                                            <li><a href="https://www.bomao88.com/announcements/971/view"><i className="fa fa-angle-right"></i> 博猫手机APP更新啦！</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="mu mu-control">
                                    <a className="at" href="#">管理中心</a>
                                    <div className="panel panel-manage">
                                        <span className="p-sj"></span>
                                        <div className="cell">
                                            <div className="title">投注记录</div>
                                            <ul>
                                                <li><a href="https://www.bomao88.com/projects?jc_type=lottery">彩票</a></li>
                                                <li><a href="https://www.bomao88.com/projects?jc_type=sport">竞彩</a></li>
                                                <li><a href="https://www.bomao88.com/projects?jc_type=casino">电子娱乐</a></li>
                                            </ul>
                                        </div>
                                        <div className="cell">
                                            <div className="title">资金管理</div>
                                            <ul>
                                                <li><a href="https://www.bomao88.com/user-recharges/netbank">充值</a></li>
                                                <li><a href="https://www.bomao88.com/user-withdrawals/withdraw">提款</a></li>
                                                <li><a href="https://www.bomao88.com/user-transactions/131371/mydeposit">充值记录</a></li>
                                                <li><a href="https://www.bomao88.com/user-transactions/131371/mywithdraw">提现记录</a></li>
                                                <li><a href="https://www.bomao88.com/user-transactions/131371/mytransfer">转账记录</a></li>
                                                <li><a href="https://www.bomao88.com/user-transactions">账变记录</a></li>
                                                <li><a href="https://www.bomao88.com/ugs/transfer-record">游戏转账</a></li>
                                            </ul>
                                        </div>
                                        <div className="cell">
                                            <div className="title">账户管理</div>
                                            <ul>
                                                <li><a href="https://www.bomao88.com/users/password-management">密码管理</a></li>
                                                <li><a href="https://www.bomao88.com/security-questions">安全口令</a></li>
                                                <li><a href="https://www.bomao88.com/bank-cards">银行卡管理</a></li>
                                                <li><a href="https://www.bomao88.com/user-user-prize-sets">我的奖金组</a></li>
                                                <li><a href="https://www.bomao88.com/user-infos">个人资料</a></li>
                                            </ul>
                                        </div>
                                        <div className="cell">
                                            <div className="title">代理中心</div>
                                            <ul>
                                                <li><a href="https://www.bomao88.com/users/accurate-create">下级开户</a></li>
                                                <li><a href="https://www.bomao88.com/user-profits/withdraw-deposit">团队充提</a></li>
                                                <li><a href="https://www.bomao88.com/user-transactions/131371/mycommission">佣金报表</a></li>
                                                <li><a href="https://www.bomao88.com/users">团队管理</a></li>
                                                <li><a href="https://www.bomao88.com/user-profits">团队盈亏</a></li>
                                                <li><a href="https://www.bomao88.com/projects/team">团队投注</a></li>
                                            </ul>
                                        </div>
                                        <div className="cell">
                                            <div className="title">消息中心</div>
                                            <ul>
                                                <li><a href="https://www.bomao88.com/announcements">平台公告</a></li>
                                                <li><i className="r-oval"></i><a href="https://www.bomao88.com/station-letters">站内信</a></li>
                                                <li><a href="https://www.bomao88.com/users/chat">站内聊天</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>  
                                <li className="mu mu-user">
                                    <a className="at" href="#">
                                        <i className="ico-top-user"></i>
                                        <span>余额：<span id="J-top-user-balance" className="money-num">0.00</span> 元</span>
                                        <i className="ico-top-sj"></i>
                                    </a>
                                    <div className="panel">
                                        <span className="p-sj"></span>
                                        <p>你好, flynn123</p>
                                        <p>
                                            <a href="https://www.bomao88.com/user-recharges/netbank" className="go-recharge">立即充值</a>
                                        </p>
                                        <p className="fund-btns">
                                            <a href="https://www.bomao88.com/user-withdrawals/withdraw">提款</a>
                                        </p>
                                        <p className="row-logout">
                                            <a href="https://www.bomao88.com/auth/logout" className="logout"><span className="ico-logout"></span> 退出游戏</a>
                                        </p>
                                        <p className="info">
                                            <span>上次登录</span>
                                            <span>2017-11-02 09:49:53</span>
                                        </p>
                                    </div>
                                </li>
                                <li><a className="at" href="https://www.bomao88.com/user-recharges/netbank">充值</a></li>
                                <li><a className="at" href="https://www.bomao88.com/user-withdrawals/withdraw">提款</a></li>
                                <li><a className="at at-chat online-server">客服</a></li>      
                            </ul>
                        </div>
                    </div>
                </div>
            </div>                    
        );
    }
}


