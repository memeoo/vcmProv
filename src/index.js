import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import ListExam from './components/listExam';
import SetNewExam from './components/setMeeting';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Router>
        <Route exact path="/" component={App}/>
        <Route path="/listExam" component={ListExam}/>
        <Route path="/setNewExam" component={SetNewExam}/>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();