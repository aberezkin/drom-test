import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Form from "../Form";
import OrderList from "../OrderList";
import logo from '../../logo.svg';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="App-container">
            <div><img src={logo} alt=""/></div>
            <Route exact path="/" component={Form} />
            <Route path="/orders" component={OrderList}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
