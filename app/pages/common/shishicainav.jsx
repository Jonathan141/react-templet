import React, {Component, PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import pureRender from 'pure-render-decorator';
import { is, fromJS} from 'immutable';
import { Tool } from '../Config/Tool';
import template from './template';
import '../Style/head.css'
import game_betlogo from '@/images/game_betlogo_1.png';
export {template}

export class NiMaBi extends Component {  //头部标题
     constructor(props,context) {
        super(props,context);
    }
    render() {
        return (
            <div className="main_top CountdownBlock">
                <div className="wid1200 lottery_frame clearfix">
                    <div className="logo-lottery"><img id="gameLogoImg" src={game_betlogo}/></div>
                    <div id="remainedtime" className="deadline">
                        <div className="NotMaintainBlock">
                            <div className="deadline-text">
                                <strong id="curissue" className="current_issue">第 20171027072 期</strong>
                                <br/>离投注截止还有
                            </div>
                            <div className="clock clearfix">
                                <div id="hour" className="hour">00</div><span>:</span>
                                <div id="minute" className="min">08</div><span>:</span>
                                <div id="second" className="sec">20</div>
                            </div>
                            <i className="bet-icon" id="BetSoundButton"></i>
                        </div>
                        
                    </div>
                    <div className="bet-header-right">
                        <div className="lottery-code-text">
                            第<strong className="past_issue" id="lastissue">20171027071</strong>期
                            <br/>开奖号码
                        </div>
                        <div className="num_open lottery-number">
                            <ul className="ssc_open list-unstyled clearfix" id="lastdigit">
                                <li><span className="each" id="lastdigit1">0</span></li>
                                <li><span className="each" id="lastdigit2">2</span></li>
                                <li><span className="each" id="lastdigit3">9</span></li>
                                <li><span className="each" id="lastdigit4">0</span></li>
                                <li><span className="each" id="lastdigit5">9</span></li>
                            </ul>
                            {
                            // <ul id="kenodigit" className="ssc_open list-unstyled clearfix">
                            //     <li><span className="each kenoresult">?</span></li>
                            //     <li><span className="each kenoresult">?</span></li>
                            //     <li><span className="each kenoresult">?</span></li>
                            //     <li><span className="each kenoresult">?</span></li>
                            //     <li><span className="each kenoresult">?</span></li>
                            // </ul>
                            }
                        </div>
                        <span className="bet-header-space"></span>
                        <div className="bet-header-twobtn">
                            <a id="DrawHistoryBtn" target="_blank" href="/DrawHistory/Trend/1?issue=30&amp;day=0&amp;categoryId=1"><button><i className="bet-icon icon01"></i>号码走势</button></a>
                            <a id="lotteryOfficialURL" target="_blank" href="http://www.cqcp.net/game/ssc/" ><button><i className="bet-icon icon02"></i>官方开奖</button></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


