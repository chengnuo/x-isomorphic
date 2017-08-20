import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

// 组件
import App from './../App';
import Home from './../pages/home';
import About from './../pages/about';
import Topics from './../pages/topics';
import NotFound from './../pages/notFound';

const RouteLayout = (
  <Router >
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
        <Route path="/notFound" component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default RouteLayout;