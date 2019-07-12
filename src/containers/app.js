import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Landing from '../components/landing/top';
import Main from './main';
import Auth from '../components/auth';
import ErrorPage from '../components/error-page';

export default () => (
  <HashRouter basename={process.env.BASE_NAME}>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/main" exact component={Main} />
      <Route path="/auth" component={Auth} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </HashRouter>
);
