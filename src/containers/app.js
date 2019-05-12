import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './landing';
import Main from './main';
import Auth from '../components/auth';

const Error404 = () => <span>404</span>;

export default () => (
  <Router basename={process.env.BASE_NAME}>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/main" exact component={Main} />
      <Route path="/auth" exact component={Auth} />
      <Route path="*" exact component={Error404} />
    </Switch>
  </Router>
);
