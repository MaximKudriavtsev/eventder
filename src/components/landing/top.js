import * as React from "react";
import { Link } from "react-router-dom";
import "./top.scss";

export default () => (
  <div className="root">
    <div className="logo-container">
      <span className="title">EVENTDER</span>
      <Link to="/main/">
        <div>Sing in as guest</div>
      </Link>
    </div>
  </div>
);
