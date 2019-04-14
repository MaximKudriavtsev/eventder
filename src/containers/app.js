import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Root from '../components/root';

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Root} />
    </Switch>
  </Router>
);