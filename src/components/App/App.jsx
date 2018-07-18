import React, { Component } from 'react';
import {  Route } from 'react-router-dom';
import Form from "../Form";
import OrderList from "../OrderList";
import logo from '../../logo.svg';

import './App.css';

class App extends Component {
  render() {
    const { isPending } = this.props;

    return (
      <div className="App">
        <div className="App-container">
          <div className="App-header">
            <img src={logo} alt=""/>
            {isPending && <div className="App-loader-wrapper">
                <div className="App-loader" />
              </div>
            }
          </div>
          <Route exact path="/" component={Form} />
          <Route path="/orders" component={OrderList}/>
        </div>
      </div>
    );
  }
}

export default App;
