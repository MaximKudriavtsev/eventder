import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Landing from './landing';
import Main from './main';
import Settings from '../components/utils/settings';
import AlertMessage from '../components/alert-message';

export default () => (
  <HashRouter basename={process.env.BASE_NAME}>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/main" exact component={Main} />
      <Route path="*" component={Landing} />
    </Switch>
    <Settings />
    <AlertMessage />
  </HashRouter>
);
