import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Form from "../Form";
import OrderList from "../OrderList";
import store from '../../state/store';
import logo from '../../logo.svg';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <div className="App-container">
              <div><img src={logo} alt=""/></div>
              <Route exact path="/" component={Form} />
              <Route path="/orders" component={OrderList}/>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
