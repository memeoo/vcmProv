import React, { Component } from 'react';
import '../css/exam.css';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter,Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import logo from '../asset/tossuplog.png'
import axios, { post } from 'axios';
import Calendar from 'react-calendar';
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';


class ModifyMeeting extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedStartTime: "",
            selectedEndTime: "",
            date: new Date(),
            mtNm:"",
            orgNm:"",
            mtCont:"",
            mtCondition:"",
            mtEtc:"",
            mtMoney:"",
            orgPlace:"",
            mtId:"",
            dropdownOpen: false,
            dropdownOpenPlace: false,
            meetingKind: "심사",
            meetingArea: "한강 이북",
        }

    }

    componentDidMount(){
        console.log(" init Data => ", this.props.location.state.data);
        let meeting = this.props.location.state.data;
        console.log(" meeting => ", meeting);
        // this.setState({mtNm:meeting.mtName});
        document.getElementById('mtNm').value = meeting.mtName;
        document.getElementById('orgNm').value = meeting.orgName;
        document.getElementById('mtCont').value = meeting.mtContent;
        document.getElementById('mtCondition').value = meeting.mtQualify;
        document.getElementById('mtEtc').value = meeting.mtEtc;
        document.getElementById('mtMoney').value = meeting.mtMoney;
        document.getElementById('orgPlace').value = meeting.mtAddress;

        this.setState({mtNm:meeting.mtName})
        this.setState({orgNm:meeting.orgName})
        this.setState({mtCont:meeting.mtContent})
        this.setState({mtCondition:meeting.mtQualify})
        this.setState({mtEtc:meeting.mtEtc})
        this.setState({mtMoney:meeting.mtMoney})
        this.setState({orgPlace:meeting.mtAddress})

        this.setState({selectedStartTime:meeting.startTime})
        this.setState({selectedEndTime:meeting.endTime})
        this.setState({date:this.getJSDate(meeting.mtDay)})

        this.setState({mtId:meeting.mtId})

    }

    toggleMeetingKind = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggleMeetingArea = () => {
        this.setState(prevState => ({
            dropdownOpenPlace: !prevState.dropdownOpenPlace
        }));
    }

    setMeetingKind = (kind, event) => {
        console.log(" kind => ", kind);
        this.setState({meetingKind: kind});
    }

    setMeetingArea = (area, event) => {
        console.log(" area => ", area);
        this.setState({meetingArea: area});
    }


    getJSDate= (data) =>{
        let eachDate = new Date(Date.parse(data));
        // let date = eachDate.getMonth()+1 + "월 " + eachDate.getDate()+ "일";
        return eachDate;
    }

    seePreview() {
        console.log("See Preview");
    }

    onChange = date => {
        this.setState({ date: date })
       
    }

    onTimeChangeStart = options => {
        console.log(" options start => ", options);
        this.setState({
            selectedStartTime: options.hour+":"+options.minute
        }) 
    }

    onTimeChangeEnd = options => {
        console.log(" options end => ", options);
        this.setState({
            selectedEndTime: options.hour+":"+options.minute
        }) 
    }
     
    onFocusChange = focusStatue => {
        console.log(" focusStatue => ", focusStatue);
    }

    
    setData(isSubmit){
        let data = {};
        data.mtNm = this.state.mtNm;
        data.orgNm = this.state.orgNm;
        data.mtCont = this.state.mtCont;
        data.mtCondition = this.state.mtCondition;
        data.mtEtc = this.state.mtEtc;
        data.mtMoney = this.state.mtMoney;
        data.orgPlace = this.state.orgPlace;
        data.uploader= this.props.location.state.id;

        data.mtKind = this.state.meetingKind;
        data.mtArea = this.state.meetingArea;
        
        data.timeStart = this.state.selectedStartTime;
        data.timeEnd = this.state.selectedEndTime;

        let date = this.state.date;
     
        let convertedDate = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + (date.getDate())).slice(-2) + ' ' + 
        ('00' + date.getUTCHours()).slice(-2) + ':' + 
        ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + date.getUTCSeconds()).slice(-2);

        data.date = convertedDate;
        data.mtId = this.state.mtId;
        data.insertOrUpdate = "update";
        data.isSubmit = isSubmit;

        return data;
    } 

    saveModifyMeeting = (event) => {
        event.preventDefault();
        console.log("Modify Save Meeting!");
        let data = this.setData("NO");
        axios.post('http://localhost:3100/saveMeeting/', data).then(response => {
            console.log(" res text >>>> ", response);
            if (response.status === 200) {
               console.log(" data => ", data);
            }
        }).catch(exception => {
            console.log(" ex text >>>> ", exception);
        })
    }

    submitModifyMeeting = (event) => {
        event.preventDefault();
        console.log("Modify Submit Meeting!");
        let data = this.setData("YES");
        axios.post('http://localhost:3100/submitMeeting/', data).then(response => {
            console.log(" res text >>>> ", response);
            if (response.status === 200) {
                console.log(" data => ", data);
            }
        }).catch(exception => {
            console.log(" ex text >>>> ", exception);
        })
    }

    onInputTextChangeHandler = event =>{
        console.log(" @@@@ => " , event.target.value);
        if(event.target.name == "mtNm"){
            this.setState({mtNm:event.target.value});
        }else if(event.target.name == "orgNm"){
            this.setState({orgNm:event.target.value});
        }else if(event.target.name == "mtCont"){
            this.setState({mtCont:event.target.value});
        }else if(event.target.name == "mtCondition"){
            this.setState({mtCondition:event.target.value});
        }else if(event.target.name == "mtEtc"){
            this.setState({mtEtc:event.target.value});
        }else if(event.target.name == "mtMoney"){
            this.setState({mtMoney:event.target.value});
        }else if(event.target.name == "orgPlace"){
            this.setState({orgPlace:event.target.value});
        }
    }

    handleChange =event => {
        this.setState({inputVal: event.target.value});
    }

    render() {

        return (
            <div className="set-exam-main">
            {/* <Form onSubmit={this.saveMeeting}> */}
            <div className="meeting-head">미팅 공고 수정</div>
            <Form encType="multipart/form-data" onSubmit={this.saveMeeting}>
                <div className='each-layer'>
                    <Label for="mtNm">공고명</Label>
                    <Input className='inpBox1' type='text' id="mtNm" name='mtNm' size='70' onChange={this.onInputTextChangeHandler}>
                    </Input>
                </div>
                <div className='each-layer'>
                    <Label for="orgNm">기관명</Label>
                    <Input className='inpBox2' type='text' id="orgNm" name='orgNm' onChange={this.onInputTextChangeHandler}>
                    </Input>
                </div>
                <div className='each-layer'>
                    <Label for="mtCont">공고 내용</Label>
                    <Input className='inpBox' type='textarea' id="mtCont" name='mtCont' onChange={this.onInputTextChangeHandler}>></Input>
                </div>
                <div className='each-layer'>
                    <Label for="mtCondition">자격 조건</Label>
                    <Input className='inpBox' type='textarea' id="mtCondition" name='mtCondition' onChange={this.onInputTextChangeHandler}>></Input>
                </div>
                <div className='each-layer'>
                    <Label for="mtEtc">기타</Label>
                    <Input className='inpBox' type='textarea' id="mtEtc" name='mtEtc' onChange={this.onInputTextChangeHandler}>></Input>
                </div>
                <div className='each-layer'>
                    <Label>미팅 종류/지역</Label>
                        <div className='time-layer'>
                            <span>미팅 종류</span>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleMeetingKind} className='meetingArea'>
                                <DropdownToggle caret>
                                    {this.state.meetingKind}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={(event) => this.setMeetingKind("심사", event)}>심사</DropdownItem>
                                    <DropdownItem onClick={(event) => this.setMeetingKind("멘토링", event)}>멘토링</DropdownItem>
                                    <DropdownItem onClick={(event) => this.setMeetingKind("강연/기타", event)}>강연/기타</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            
                            <span style={{marginLeft: '15px'}}>미팅 지역</span>
                            <Dropdown isOpen={this.state.dropdownOpenPlace} toggle={this.toggleMeetingArea} className='meetingArea'>
                                <DropdownToggle caret>
                                    {this.state.meetingArea} 
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={(event) => this.setMeetingArea("한강 이북", event)}>한강 이북</DropdownItem>
                                    <DropdownItem onClick={(event) => this.setMeetingArea("한강 이남", event)}>한강 이남</DropdownItem>
                                    <DropdownItem onClick={(event) => this.setMeetingArea("경기", event)}>경기</DropdownItem>
                                    <DropdownItem onClick={(event) => this.setMeetingArea("충청", event)}>충청</DropdownItem>
                                    <DropdownItem onClick={(event) => this.setMeetingArea("기타", event)}>기타</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                </div>
                <div className='each-layer'>
                    <Label for="mtDay">날짜</Label> <span className="dayDisplay">{this.state.date.getMonth()+1}월 {this.state.date.getDate()}일</span>
                    <Calendar
                        className='calrenda'
                        onChange={this.onChange}
                        value={this.state.date}
                    />
                </div>
                <div className='each-layer'>
                    <Label for="mtTime">시각</Label>
                    <div className='time-layer'>
                        <span className="time-title">시작 시간</span>
                        <TimePicker className="time-picker"
                            time = {this.state.selectedStartTime} 
                            theme="classic"
                            onFocusChange={this.onFocusChange}
                            onTimeChange={this.onTimeChangeStart}
                        />
                        <span className="time-title">종료 시간</span>
                        <TimePicker 
                            time = {this.state.selectedEndTime} 
                            theme="classic"
                            onFocusChange={this.onFocusChange}
                            onTimeChange={this.onTimeChangeEnd}
                        />
                    </div>
                </div>
                <div className='each-layer'>
                    <Label for="mtMoney">사례비</Label><br></br>
                    <input className='inpBox3' type='text' id="mtMoney" name='mtMoney' size='15' onChange={this.onInputTextChangeHandler}></input><span>만원</span>
                </div>
                <div className='each-layer-last'>
                    <Label for="orgPlace">장소(주소)</Label>
                    <Input className='inpBox2' type='text' id="orgPlace" name='orgPlace' onChange={this.onInputTextChangeHandler}>></Input>
                </div>
                <div className="btn-area">
                    <div className="audio-question">
                        <Button color="secondary" type="submit" onClick={this.saveModifyMeeting}>임시저장(Save)</Button>
                    </div>
                    <div className="audio-question">
                        <Button color="secondary" onClick={this.submitModifyMeeting}>제 출(Submit)</Button>
                    </div>
                </div>
            </Form>
            <div className="empty-layer"></div>
        </div>
        );
    }
}

export default withRouter(ModifyMeeting);