import React,{Component} from 'react';
import '../css/exam.css';
import {withRouter} from 'react-router-dom'; 
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import classnames from 'classnames';

import { Button, ListGroup, ListGroupItem, Badge, ListGroupItemHeading, ListGroupItemText, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import { element } from 'prop-types';
import { Card } from '@material-ui/core';
import comm from './common';


class ListMeeting extends Component {

    constructor(props) {
        super(props);
        console.log(" ####################### ", this.props);
        this.state = {
            meetingDataSaved:[],
            meetingDataSubmitted:[],
            activeTab: '1',
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidMount(){
        let provId = this.props.location.state.id;
        console.log(" id => ", provId);
        axios.get(comm.SERVER_URL+comm.SERVER_PORT+'/getMeetings/',{params:{id: provId}}).then(res => {
            console.log(" res => ", res);
            let meetings = res.data;
         
            
            for(let i=0; i< meetings.length; i++){
                console.log(" meetings 33 => ", meetings[i].isSubmit);
                if(meetings[i].isSubmit === "NO"){
                    let joined = this.state.meetingDataSaved.concat(meetings[i]);
                    this.setState({meetingDataSaved:joined})
                   
                }else{
                    let joined = this.state.meetingDataSubmitted.concat(meetings[i]);
                    this.setState({meetingDataSubmitted:joined})
                }
            }

            console.log(" meetings meetingDataSaved => ", this.state.meetingDataSaved);
            console.log(" meetings meetingDataSubmitted => ", this.state.meetingDataSubmitted);
        });

    }

    getName(){
        let name = " "+this.props.location.state.name;
        console.log(" name => ", name);
        return name+" 관리자 님"; 
    }

    moveSetNewExam(prop){
        console.log("New Exam!");
        this.props.history.push(
        {
            pathname: '/setNewExam',
            state: {id: this.props.location.state.id}
        });
    }

    meetingSavedListClickHandler = (index, event) => {
        console.log(" index => ", index);
        console.log(" event => ", event);

        this.props.history.push(
            {
                pathname: '/modifyMeeting',
                state: {
                    id: this.props.location.state.id,
                    data: this.state.meetingDataSaved[index]
                }
            });
    }

    meetingSubmittedListClickHandler = (index, event) => {
        console.log(" index => ", index);
        console.log(" event => ", event);

        this.props.history.push(
            {
                pathname: '/checkSubmittedMeeting',
                state: {
                    id: this.props.location.state.id,
                    data: this.state.meetingDataSubmitted[index]
                }
            }
        );
    }


    getJSDate= (data) =>{
        let eachDate = new Date(Date.parse(data));
        let date = eachDate.getMonth()+1 + "월 " + eachDate.getDate()+ "일";
        return date;
    }

    render() {
        return (
            <div className="list-exam-main">
                <div className='top-upper-layer'>
                    안녕하세요!  {this.getName()}
                </div>
                <div className="new-exam-btn">
                    <Button color="primary" size="lg" block onClick={() => this.moveSetNewExam(this.props)}>새 미팅(공고) 올리기</Button>
                </div>
                <div className="tab-menu">
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                            미 제출
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                            제출 완료
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <div className="examed-lists">
                            <ListGroup>
                                {this.state.meetingDataSaved.map((data,index) =>
                                    <ListGroupItem tag="button" action className='list-card' onClick={(event) => this.meetingSavedListClickHandler(index,event)} >
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
                                {this.state.meetingDataSubmitted.map((data,index) =>
                                    <ListGroupItem tag="button" action className='list-card' onClick={(event) => this.meetingSubmittedListClickHandler(index, event)} >
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


export default withRouter(ListMeeting);