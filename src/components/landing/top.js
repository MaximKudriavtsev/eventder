import * as React from "react";
import { Link } from "react-router-dom";
import { root } from "./top.scss";

export default () => (
  <div>
    <span className={root}>Landing element</span>
    <Link to="/main/">
      <div>
        Sing in as guest
      </div>
    </Link>
  </div>
);
