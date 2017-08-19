import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';


class App extends Component {
  test = () => {
    console.log('去掉')
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React1</h2>
          <div onClick={this.test}>点击我2</div>
          <Button type="primary" onClick={this.test}>Primary</Button>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
