import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../state/store';
import App from "../App";


class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <App/>
        </Router>
      </Provider>
    );
  }
}

export default Root;
