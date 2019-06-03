import React, { Component } from 'react';
import '../css/exam.css';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import logo from '../asset/tossuplog.png'
import axios, { post } from 'axios';

const fileData = new FormData();
class SetExam extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedFiles: [],
            t1:"",
            t2:"",
            t3:"",
        }

    }

    seePreview() {
        console.log("See Preview");
    }
   
    saveExam = (event) => {
        event.preventDefault()
      
        let textData = {};
        textData.q1 = this.state.t1;
        textData.q2 = this.state.t2;
        textData.q11 = this.state.t3;
        let id = this.props.location.state.id;
        textData.id = id;
        console.log(" textData => ", textData);

        // id를 인자로 넘겨서 id값이 "" 이면 새 출제, 
        // 아니면, 해당 id 문제 수정 
        // 일단 생성 되면 listExam에 보이기. 
        axios.post('http://localhost:3003/saveExam/', textData).then(response => {
            console.log(" res text >>>> ", response);
            if (response.status === 200) {
                console.log(" fileData => ", fileData.get("uploadImgChart"));
                // axios.post('http://localhost:3003/saveFile/', fileData).then(response => {
                //     console.log(" res file >>>> ", response);
                //     if (response.status === 200) {

                //     }
                // });
                // let dataTemp = {aa: "bb"};
                
                axios({
                    url: 'http://localhost:3003/saveFile/',
                    method: 'POST',
                    data: fileData,
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'multipart/form-data'
                    }
                  }).then(response => {
                    console.log(" ex response >>>> ", response);
                  })
                  .catch(exception => {
                    console.log(" ex file >>>> ", exception);
                })

                // const url ="http://localhost:3003/saveFile/";
                // const config = {
                //     headers: {
                //         'content-type': 'multipart/form-data'
                //     }
                // };
                // post(url, fileData, config);
            }
        }).catch(exception => {
            console.log(" ex text >>>> ", exception);
        })
    }

    submitNewExam() {
        console.log("Submit New Exam!");
        // if(this.state.ques3Img.includes())
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

    audioUpload = event =>{
        console.log("Audio uploading!"); 
        let fileInputDom = null;
        let compId = event.target.id;
        console.log(" compId => ", event.target.id); 
        let inputDomId = compId.replace("btn","");
        fileInputDom = document.getElementById(inputDomId)

        fileInputDom.click();
        fileInputDom.onchange = function(){
            var fileList = fileInputDom.files;   
            if(typeof(fileList[0]) === "undefined"){
                console.log( " Undefined !!");
                return;
            }

            fileData.append(compId, fileList[0]);
            console.log(" files ===> ",fileData);
            var reader = new FileReader();
            reader.readAsDataURL(fileList[0]);
            reader.onload = function(){
                document.getElementById(compId).innerText = "File uploaded";
                // data.append(compId, fileList[0])
            };
          }
    }

    onInputTextChangeHandler = event =>{
        console.log(" @@@@ => " , event.target.value);
        if(event.target.name == "ques1"){
            this.setState({t1:event.target.value});
        }else if(event.target.name == "ques2"){
            this.setState({t2:event.target.value});
        }else if(event.target.name == "ques11"){
            this.setState({t3:event.target.value});
        }

    }

    render() {
        return (
            <div className="set-exam-main">
            {/* <Form onSubmit={this.saveExam}> */}
            <Form encType="multipart/form-data" onSubmit={this.saveExam}>
                <div className='title-layer'>
                    PART 1
                </div>
                    <div className="question-area">
                        <div>Question 1</div>

                            <Input type="textarea" className="question" id="ques1" onChange={this.onInputTextChangeHandler} name="ques1"></Input>
           
                        <div style={{ marginTop: "10px" }}>Question 2</div>
                      
                            <Input type="textarea" className="question" id="ques2" onChange={this.onInputTextChangeHandler} name="ques2"></Input>
                       
                    </div>
                <div className='title-layer'>
                    PART 2
                </div>
                <div className="question-area">
                    <div>Question 3</div>
                    <input type='file' id='pic_read' name='q3' width="350px" height="220px" accept="image/*" hidden/>
                    <img src={logo} id="uploadImgPic"className="img-upload-pic" onClick={this.imageUpload} ></img>
                </div>
                <div className='title-layer'>
                    PART 3
                </div>
                <div className="question-area">
                    <div className="audio-question">
                      <div className="inner-question">Question 4</div>
                      <input type='file' id='ques4' name='q4' accept="audio/*" hidden/>
                      <Button color="secondary" id="ques4btn" onClick={this.audioUpload} >음성 파일 선택</Button>
                    </div>
                    <div className="audio-question">
                      <div className="inner-question">Question 5</div>
                      <input type='file' id='ques5' name='q5' accept="audio/*" hidden/>
                      <Button color="secondary" id="ques5btn" onClick={this.audioUpload}>음성 파일 선택</Button>
                    </div>
                    <div className="audio-question">
                      <div className="inner-question">Question 6</div>
                      <input type='file' id='ques6' name='q6'  accept="audio/*" hidden/>
                      <Button color="secondary" id="ques6btn" onClick={this.audioUpload}>음성 파일 선택</Button>
                    </div>
                </div>
                <div className='title-layer'>
                    PART 4
                </div>
                <div className="question-area">
                    <div>
                        <input type='file' id='chart_read' name='qChart' width="550px" height="400px" accept="image/*" hidden/>
                        <img src={logo} id="uploadImgChart"className="img-upload-chart" onClick={this.imageUpload} ></img>
                    </div>
                    <div className="audio-question"> 
                      <div className="inner-question">Question 7</div>
                      <input type='file' id='ques7' name='q7' accept="audio/*" hidden/>
                      <Button color="secondary" id="ques7btn" onClick={this.audioUpload}>음성 파일 선택</Button>
                    </div>
                    <div className="audio-question">
                      <div className="inner-question">Question 8</div>
                      <input type='file' id='ques8' name='q8' accept="audio/*" hidden/>
                      <Button color="secondary" id="ques8btn" onClick={this.audioUpload}>음성 파일 선택</Button>
                    </div>
                    <div className="audio-question">
                      <div className="inner-question">Question 9</div>
                      <input type='file' id='ques9' name='q9'  accept="audio/*" hidden/>
                      <Button color="secondary"  id="ques9btn" onClick={this.audioUpload}>음성 파일 선택</Button>
                    </div>
                </div>
                <div className='title-layer'>
                    PART 5
                </div>
                <div className="question-area">
                    <div className="inner-question">Question 10</div>
                    <input type='file' id='ques10' name='q10'  accept="audio/*" hidden/>
                    <Button color="secondary" id="ques10btn" onClick={this.audioUpload}>음성 파일 선택</Button>
                </div>
                <div className='title-layer'>
                    PART 6
                </div>
                <div className="question-area">
                    <div className="inner-question">Question 11</div>
                    <Input type="textarea" className="question" id="ques11" name="ques11" onChange={this.onInputTextChangeHandler}></Input>
                </div>
                <div style={{height:"20px"}}></div>   
                <div className="btn-area">
                    <div className="audio-question">
                        <Button color="secondary" onClick={() => this.seePreview()}>미리보기(Preview)</Button>
                    </div>
                    <div className="audio-question">
                        <Button color="secondary" type="submit" onClick={this.saveExam}>임시저장(Save)</Button>
                    </div>
                    <div className="audio-question">
                        <Button color="secondary" onClick={() => this.submitNewExam()}>제 출(Submit)</Button>
                    </div>
                </div>
            </Form>
        </div>
        );
    }
}

export default withRouter(SetExam);