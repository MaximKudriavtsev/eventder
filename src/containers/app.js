import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './landing';
import Main from './main';
import Auth from '../components/auth';

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/main" exact component={Main} />
      <Route path="/auth" exact component={Auth} />
    </Switch>
  </Router>
);
