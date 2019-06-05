import React, { Component } from 'react';
import '../css/exam.css';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import logo from '../asset/tossuplog.png'
import axios, { post } from 'axios';
import Calendar from 'react-calendar';
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';


const fileData = new FormData();
class CheckSubmittedMeeting extends Component {
    
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
        }

    }

    seePreview() {
        console.log("See Preview");
    }

    onChange = date => {
        this.setState({ date: date })
        console.log(" date => ", this.state.date)
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

    saveMeeting = (event) => {
        event.preventDefault()
      
        let data = {};
        data.mtNm = this.state.mtNm;
        data.orgNm = this.state.orgNm;
        data.mtCont = this.state.mtCont;
        data.mtCondition = this.state.mtCondition;
        data.mtEtc = this.state.mtEtc;
        data.mtMoney = this.state.mtMoney;
        data.orgPlace = this.state.orgPlace;
        data.uploader= this.props.location.state.id;
        data.timeStart = this.state.selectedStartTime;
        data.timeEnd = this.state.selectedEndTime;
        data.date = this.state.date.toISOString().slice(0, 19).replace('T', ' ');

        console.log(" data => ", data);

        // id를 인자로 넘겨서 id값이 "" 이면 새 출제, 
        // 아니면, 해당 id 문제 수정 
        // 일단 생성 되면 listExam에 보이기. 
        axios.post('http://localhost:3100/saveMeeting/', data).then(response => {
            console.log(" res text >>>> ", response);
            if (response.status === 200) {
                console.log(" data => ", data);
            }
        }).catch(exception => {
            console.log(" ex text >>>> ", exception);
        })
    }

    submitNewExam = (event) => {
        console.log("Submit New Exam!");
        event.preventDefault()
        let data = {};
        data.mtNm = this.state.mtNm;
        data.orgNm = this.state.orgNm;
        data.mtCont = this.state.mtCont;
        data.mtCondition = this.state.mtCondition;
        data.mtEtc = this.state.mtEtc;
        data.mtMoney = this.state.mtMoney;
        data.orgPlace = this.state.orgPlace;
        data.uploader= this.props.location.state.id;
        data.timeStart = this.state.selectedStartTime;
        data.timeEnd = this.state.selectedEndTime;
        data.date = this.state.date.toISOString().slice(0, 19).replace('T', ' ');
        data.isSubmit = 1;

        console.log(" data => ", data);

        // id를 인자로 넘겨서 id값이 "" 이면 새 출제, 
        // 아니면, 해당 id 문제 수정 
        // 일단 생성 되면 listExam에 보이기. 
        axios.post('http://localhost:3100/submitMeeting/', data).then(response => {
            console.log(" res text >>>> ", response);
            if (response.status === 200) {
                console.log(" data => ", data);
            }
        }).catch(exception => {
            console.log(" ex text >>>> ", exception);
        })
    }

    imageUpload = (event)=> {
        console.log("Image uploading!");
        let fileInputDom = null;
        var reader = new FileReader();
        let compId = event.target.id;
        console.log(" compId => ", event.target.id); 
        if(compId == "uploadImgPic"){
            fileInputDom = document.getElementsByName("q3")[0];
        }else{
            fileInputDom = document.getElementsByName("qChart")[0];
        }

        fileInputDom.click();
        fileInputDom.onchange = function(){
            if(fileInputDom.files){
                let fileList = fileInputDom.files;
                console.log(" files ===> ",fileList[0]);
                fileData.append(compId, fileList[0]);
                
     
                reader.readAsDataURL(fileList[0]);
                reader.onload = function(){
                    document.getElementById(compId).src = reader.result;
                };   
            }
            // console.log(" selectedFile => ", selectedFiles);
        }     
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
                    <Input className='inpBox1' type='text' id="mtNm" name='mtNm' size='70' value={this.state.inputVal} onChange={this.onInputTextChangeHandler}></Input>
                </div>
                <div className='each-layer'>
                    <Label for="orgNm">기관명</Label>
                    <Input className='inpBox2' type='text' id="orgNm" name='orgNm' onChange={this.onInputTextChangeHandler}>></Input>
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
                        <span>시작 시간</span>
                        <TimePicker
                            time = {this.state.selectedStartTime} 
                            theme="classic"
                            onFocusChange={this.onFocusChange}
                            onTimeChange={this.onTimeChangeStart}
                        />
                    </div>
                    <div className='time-layer'>
                        <span>종료 시간</span>
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
                        <Button color="secondary" type="submit" onClick={this.saveMeeting}>임시저장(Save)</Button>
                    </div>
                    <div className="audio-question">
                        <Button color="secondary" onClick={this.submitNewExam}>제 출(Submit)</Button>
                    </div>
                </div>
            </Form>
            <div className="empty-layer"></div>
        </div>
        );
    }
}

export default withRouter(CheckSubmittedMeeting);