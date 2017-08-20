// react 组件
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
// css或者静态资源
import logo from './logo.svg';
import './App.css';
// antd组件
import { Button } from 'antd';
// reduxs组件
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from 'REDUXS/actions';


// class App extends Component {
//   test = () => {
//     console.log('去掉'); // TODO: 测试 FIXME:
//   }
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React1</h2>
//           <div onClick={this.test}>点击我2</div>
//           <Button type="primary" onClick={this.test}>Primary</Button>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;


class App extends Component {
  componentDidMount() {
    this.props.action.actionsTodo();
    this.props.action.fetchLogin();
  }
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>
      </div>
    );
  }
}


//export default App;
function mapStateToProps(state, props) {
  return {
    // message: state.loginReducer.message,
    // loading: state.loginReducer.loading,
    // isLogined: state.loginReducer.isLogined,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);