import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import ListMeeting from './components/listMeeting';
import SetNewExam from './components/setMeeting';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import modifyMeeting from './components/modifyMeeting';
import CheckSubmittedMeeting from './components/checkSubmittedMeeting';


ReactDOM.render(
    <Router>
        <Route exact path="/" component={App}/>
        <Route path="/listMeeting" component={ListMeeting}/>
        <Route path="/modifyMeeting" component={modifyMeeting}/>
        <Route path="/checkSubmittedMeeting" component={CheckSubmittedMeeting}/>
        <Route path="/setNewExam" component={SetNewExam}/>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();