import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../src/App.css';
import {withRouter} from 'react-router-dom';  
import axios from 'axios';
import comm from './common';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      warningModal: false,
      warningText:"",
    }
    this.toggle = this.toggle.bind(this);
    this.warningToggle = this.warningToggle.bind(this);
    
    // this.setWarningText = this.setWarningText.bind(this);
    
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  warningToggle(){
    this.setState(prevState => ({
      warningModal: !prevState.warningModal,
    }));
  }

  componentDidMount(){
    console.log(" >>>>>> ", comm.SERVER_URL);
  };
  
  doLogin = (event) => {
    event.preventDefault()
    let uid = event.target.id.value;
    let upass = event.target.pass.value;
    
    if(uid.length === 0 || upass.length === 0){
      return;
    }

    axios.get('http://localhost:3100/login/', {
      params: { id: uid, pass: upass }
    }).then(response => {
      console.log(" ######## ", response.data[0]);
      this.props.history.push(
        {
          pathname: '/listMeeting',
          state: {name: response.data[0].name, id: response.data[0].mail}
        });

    }).catch(exception => {
      console.log(" ex >>>> ", exception);
      this.state.warningText = "Check your ID and Password, again.";
      this.warningToggle()
      // this.setWarningText("Check your ID and Password, again.");
    })
  }

  doSignup = (event) => {
    event.preventDefault()

    let sid = event.target.sid.value;
    let spass = event.target.spass.value;
    let repass = event.target.pass_re.value;
    let sname = event.target.sname.value;
    let phoneNumber = event.target.phoneNumber.value;
    let smail = event.target.smail.value;

    console.log(event.target.sid.value);
    console.log(event.target.spass.value);
    console.log(event.target.pass_re.value);
    console.log(event.target.phoneNumber.value);
    console.log(event.target.smail.value);

    if (spass !== repass) {
      // this.setWarningText("Should input same password.");
      this.state.warningText = "Should input same password.";
      this.warningToggle();

      console.log(" warning text => ", this.state.warningText)
      return;
    }

    axios.post('http://localhost:3100/signup/', 
       { id: sid, pass: spass, name: sname, smail: smail, phoneNumber:phoneNumber}
    ).then(response => {
      console.log(" res >>>> ", response);
      if(response.status === 200){
        this.toggle();
      }
    }).catch(exception => {
      console.log(" ex >>>> ", exception);
    })
  }

  render() {
    return (
      <div className="App">
        <div style={{ marginTop: "33px" }}>
          <span className="mainTitle">VCM</span><span style={{ marginLeft: "19px", fontSize: "21px" }}>관리자용</span>
        </div>
        <div style={{ marginTop: "9px" }}>
        <span className="middleTitle">Venture Capitallist Meeting</span>
        </div>
        <div style={{ marginTop: "12px" }}>
          <span className="subTitle">국내 벤쳐캐피탈리스트들과 연결해 드립니다</span>
        </div>
        <div className="form">
          <Form onSubmit={this.doLogin}>
            <FormGroup>
              <Label for="id">ID</Label>
              <Input type="text" name="id" id="id" maxLength="20" />
            </FormGroup>
            <FormGroup>
              <Label>PASSWORD</Label>
              <Input type="password" name="pass" />
            </FormGroup>
            <Button color="primary" size="lg" block type="submit">로그인 (Login)</Button>
          </Form>
          <Button outline color="secondary" size="sm" block style={{ marginTop: "12px" }} onClick={this.toggle}>회원 가입(Sign up)</Button>
        </div>
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>회원 가입</ModalHeader>

            <Form onSubmit={this.doSignup}>
              <ModalBody>
                <FormGroup>
                  <Label for="id">ID</Label>
                  <Input type="text" name="sid" id="sid" maxLength="20" />
                </FormGroup>
                <FormGroup>
                  <Label>PASSWORD</Label>
                  <Input type="password" name="spass" />
                </FormGroup>
                <FormGroup>
                  <Label>PASSWORD 확인</Label>
                  <Input type="password" name="pass_re" />
                </FormGroup>
                <FormGroup>
                  <Label for="id">Email</Label>
                  <Input type="email" name="smail" id="semaile" maxLength="35" />
                </FormGroup>
                <FormGroup>
                  <Label for="name">전화 번호</Label>
                  <Input type="text" name="phoneNumber" id="phoneNumber" maxLength="13" />
                </FormGroup>
                <FormGroup>
                  <Label for="name">사용할 별명</Label>
                  <Input type="text" name="sname" id="snm" maxLength="20" />
                </FormGroup>

              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit">제출</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>취소</Button>
              </ModalFooter>
            </Form>
          </Modal>
          
          <Modal isOpen={this.state.warningModal} toggle={this.warningToggle} >
            <ModalHeader>
              {this.state.warningText}
            </ModalHeader>
            <ModalFooter>
                <Button color="secondary" onClick={this.warningToggle}>확인(OK)</Button>
              </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

// export withRouter(Login);
export default withRouter(Login);
