import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './landing';
import Main from './main';
import Settings from './settings';
import ErrorPage from '../components/error-page';

export default () => (
  <BrowserRouter basename={process.env.BASE_NAME}>
    <Settings />
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/main" exact component={Main} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>
);
