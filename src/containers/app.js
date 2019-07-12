import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from '../components/landing/top';
import Main from './main';
import ErrorPage from '../components/error-page';

export default () => (
  <BrowserRouter basename={process.env.BASE_NAME}>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/main" exact component={Main} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </BrowserRouter>
);
