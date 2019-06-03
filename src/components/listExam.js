import React,{Component} from 'react';
import '../css/exam.css';
import {withRouter} from 'react-router-dom'; 
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class ListExam extends Component {

    wrapperDivList = null;
    divList = [];
    constructor(props) {
        super(props);
        console.log(" ####################### ", this.props);
        this.state = {
            meetingData:[]
        }
        // this.toggle = this.toggle.bind(this);
    }

    componentDidMount(){
        let provId = this.props.location.state.id;
        console.log(" id => ", provId);
        axios.get('http://localhost:3100/getMeetings/',{params:{id: provId}}).then(res => {
            console.log(" res => ", res);
            this.setState({meetingData:res.data})
            for(let i=0; i < this.state.meetingData.length; i++){
                this.divList.push(
                    <ListItem button>
                        <ListItemText primary={this.state.meetingData[i].mtName}></ListItemText>
                    </ListItem>
                )
            }            
            
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

    render() {
        return (
            <div className="list-exam-main">
                <div className='top-upper-layer'>
                    안녕하세요!  {this.getName()}
                </div>
                <div className="new-exam-btn">
                    <Button color="primary" size="lg" block onClick={() => this.moveSetNewExam(this.props)}>새 미팅(공고) 올리기</Button>
                </div>
                <div className="examed-lists">
                    <List component="nav">
                        {this.divList}
                    </List>
                </div>
            </div>
        );
    }
}


export default withRouter(ListExam);