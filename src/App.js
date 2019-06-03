import React, { Component } from 'react';
import './App.css';
import Login from '../src/components/login';
import { BrowserRouter, Route, } from 'react-router-dom'
// import SetNewExam from './components/setExam';

class App extends Component {

  render() {
  
    return (
      <div>
        <Login/>
        {/* <BrowserRouter>
          <Route path="/setNewExam" component={SetNewExam}/>
        </BrowserRouter> */}
      </div>


    );
  }
}


export default App;
