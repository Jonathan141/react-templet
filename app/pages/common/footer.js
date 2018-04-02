import React, {Component, PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import { is, fromJS} from 'immutable';
import '../Style/footer.less'
import loginNew from '../images/logo-new.png'
import loginNewSvg from '../images/logo-new.svg'
export default class footer extends Component {  //头部标题
     constructor(props,context) {
        super(props,context);
    }
    render() {
        return (
            <div className="jack-foot" id="jack-foot">
                <div className="container">
                    <div className="foot-top clearfix">
                        <div className="foot-logo hidden-xs">
                            <svg width="111" height="23">
                                <image xlinkHref="http://www.w3.org/1999/xlink" xlinkHref={loginNewSvg} src={loginNew} width="111" height="23"></image>
                            </svg>
                        </div>
                        <div className="foot-number">
                            
                        </div>
                    </div>
                    <div className="foot-link clearfix">
                        <div className="foot-a">
                            <a href="/brand">博猫品牌</a>
                            <span></span>
                            <a href="/help">帮助中心</a>
                            <span></span>
                            <a href="/brand#concat">联系我们</a>
                            <span></span>
                            <a href="/mobile" target="_blank">手机客户端</a>
                            <span></span>
                            <a href="/pc-client/index.html" target="_blank">PC客户端</a>
                            <span></span>
                            <a href="/fastlogin/index.html" target="_blank">快速登录器</a>
                            <span></span>
                            <a href="/events/repairDNS" target="_blank">防劫持教程</a>
                        </div>
                        <div className="foot-authority hidden-xs">权威认证资质</div>
                    </div>
                    <div className="foot-erweima visible-xs-block"><img src={require('../../images/phone-code.png')} alt=""/></div>
                    <div className="foot-pic clearfix">
                        <ul className="foot-icon">
                            <li className="hidden-xs">
                                <svg width="23" height="23">
                                    <image xlinkHref="http://www.w3.org/1999/xlink" xlinkHref={require('../../images/foot-icon-1.svg')} data-src={require('../../images/foot-icon-1.svg')} width="23" height="23"></image>
                                </svg>
                                <div className="up-drop hidden-xs">
                                    <div className="up-menu">
                                        <div className="foot-code">博猫公众号</div>
                                        <div><img src="../../images/phone-code.png" alt=""/></div>
                                        <div className="foot-game">
                                            <div>微信号</div>
                                            <div>baomaogame</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <svg width="23" height="23">
                                    <image xlinkHref="http://www.w3.org/1999/xlink" xlinkHref={require('../../images/foot-icon-2.svg')} data-src="../../images/foot-icon-2.png" width="23" height="23"></image>
                                </svg>
                            </li>
                            <li>
                                <svg width="23" height="23">
                                    <image xlinkHref="http://www.w3.org/1999/xlink" xlinkHref={require('../../images/foot-icon-3.svg')} data-src="../../images/foot-icon-3.png" width="23" height="23"></image>
                                </svg>
                            </li>
                            <li>
                                <svg width="23" height="23">
                                    <image xlinkHref="http://www.w3.org/1999/xlink" xlinkHref={require('../../images/foot-icon-4.svg')} data-src="../../images/foot-icon-4.png" width="23" height="23"></image>
                                </svg>
                            </li>
                            <li>
                                <svg width="23" height="23">
                                    <image xlinkHref="http://www.w3.org/1999/xlink" xlinkHref={require('../../images/foot-icon-5.svg')} data-src="../../images/foot-icon-5.png" width="23" height="23"></image>
                                </svg>
                            </li>
                            <li>
                                <svg width="23" height="23">
                                    <image xlinkHref="http://www.w3.org/1999/xlink" xlinkHref={require('../../images/foot-icon-6.svg')} src="../../images/foot-icon-6.png" width="23" height="23"></image>
                                </svg>
                            </li>
                        </ul>
                        <ul className="foot-tip hidden-xs clearfix">
                            <li className="li-1">
                                <div className="tip-drop">
                                    <span className="tip-con">PAGCOR</span>
                                </div>
                            </li>
                            <li className="li-2">
                                <div className="tip-drop">
                                    <span className="tip-con">CEZA</span>
                                </div>
                            </li>
                            <li className="li-3">
                                <div className="tip-drop">
                                    <span className="tip-con">GLI</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="foot-bottom clearfix">
                        <div className="foot-text">
                            <div className="copy-right">
                                <span>© 2014 博猫游戏版权所有</span>
                                <span className="approve">菲律宾政府PAGCOR博彩牌照认证</span>
                            </div>
                            <div>博猫游戏郑重提示：彩票有风险，投注需谨慎，不向未满18周岁的青少年出售彩票</div>
                        </div>
                        <div className="foot-bottom-r hidden-xs">
                            <img data-src={require('../../images/footer-gamble.png')} src={require('../../images/footer-gamble.png')} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

