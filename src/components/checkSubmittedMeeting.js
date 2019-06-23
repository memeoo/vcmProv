import React, { Component } from 'react';
import '../css/checkSubmittedMeeting.css';
import { Button, ListGroup, ListGroupItem, Badge, ListGroupItemHeading, ListGroupItemText, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import logo from '../asset/tossuplog.png'
import axios, { post } from 'axios';
import Calendar from 'react-calendar';
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';
import classnames from 'classnames';
import comm from './common';

class CheckSubmittedMeeting extends Component {
    
    meetingApplying = [];
    meetingQuestion = [];

    constructor(props) {
        super(props);
        this.state = {
            mtData : {},
            activeTab: '1',
            meetingApplying : [],
            meetingQuestion : [],
        }
        this.toggle = this.toggle.bind(this);
        
    }
    componentWillMount(){
        this.state.mtData = this.props.location.state.data;
        console.log(" mtData => ", this.state.mtData);
    }

    componentDidMount(){
        console.log(" mtData => ", this.props.location.state.data);
        let provId = this.props.location.state.id;
        console.log(" id => ", provId);
        axios.get(comm.SERVER_URL + comm.SERVER_PORT + '/getApplied/', { params: { provId: provId } }).then(res => {
            console.log(" res => ", res);
            let applieds = res.data;
            for (let i = 0; i < applieds.length; i++) {
                console.log(" applieds => ", applieds[i]);
                let joined = this.state.meetingApplying.concat(applieds[i]);
                this.setState({ meetingApplying: joined })
            }
            console.log(" meetings meetingDataSaved => ", this.state.meetingApplying);
        });

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    goModifyMeeting = () => {
  
        this.props.history.push(
            {
                pathname: '/modifyMeeting',
                state: {
                    data: this.state.mtData,
                }
            }
        );
    }

    responseMeetingApply = (index, event) =>{
        console.log( " response Apply! ")
    }

    responseMeetingQuestion = (index, event) =>{
        console.log( " response Question! ")
    }

    render() {
        return (
            <div className="whole-content">
                <div className="meeting-content-title">
                    <span>공고 미팅 내용</span>
                    <Button className="modify-meeting" onClick={this.goModifyMeeting}>공고 수정하기</Button>
                </div>
                <div className="meeting-content">
                    <p className="each-p">과제명: {this.state.mtData.mtName}</p>
                    <p className="each-p">기관명: {this.state.mtData.orgName}</p>
                    <p className="each-p">날짜:  {this.state.mtData.mtDay.substring(0,10).replace("-","년 ").replace("-","월 ")+"일"}</p>
                    <p className="each-p">시각:  {this.state.mtData.startTime} ~ {this.state.mtData.endTime}</p>
                    <p className="each-p">과제 설명: {this.state.mtData.mtContent}</p>
                    <p className="each-p">자격: {this.state.mtData.mtQualify}</p>
                    <p className="each-p">기타: {this.state.mtData.mtEtc}</p>
                    <p className="each-p">지급비: {this.state.mtData.mtMoney}만원</p>
                    <p className="each-p">주소: {this.state.mtData.mtAddress}</p>
                </div>

                <div className="tab-menu">
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                            신청
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                            문의
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <div className="examed-lists">
                            <ListGroup>
                                {this.state.meetingApplying.map((data,index) =>
                                    <ListGroupItem tag="button" action className='list-card' onClick={(event) => this.responseMeetingApply(index,event)} >
                                        <ListGroupItemHeading>{data.mtName}</ListGroupItemHeading>
                                        <ListGroupItemText>{data.mtContent}</ListGroupItemText>
                                        <ListGroupItemText>{this.getJSDate(data.mtDay)}</ListGroupItemText>
                                    </ListGroupItem>)}
                            </ListGroup>
                        </div>
                    </TabPane>
                    <TabPane tabId="2">
                        <div className="examed-lists">
                            <ListGroup>
                                {this.state.meetingQuestion.map((data,index) =>
                                    <ListGroupItem tag="button" action className='list-card' onClick={(event) => this.responseMeetingQuestion(index, event)} >
                                        <ListGroupItemHeading>{data.mtName}</ListGroupItemHeading>
                                        <ListGroupItemText>{data.mtContent}</ListGroupItemText>
                                        <ListGroupItemText>{this.getJSDate(data.mtDay)}</ListGroupItemText>
                                    </ListGroupItem>)}
                            </ListGroup>
                        </div>
                    </TabPane>
                </TabContent>
                </div>

            </div>
        );
    }
}

export default withRouter(CheckSubmittedMeeting);
