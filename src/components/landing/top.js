import * as React from "react";
import { Link } from "react-router-dom";
import styles, { root, title } from "./top.scss";

export default () => (
  <div className={root}>
    <div className={styles["logo-container"]}>
      <span className={title}>EVENTDER</span>
      <Link to="/main/">
        <div>Sing in as guest</div>
      </Link>
    </div>
  </div>
);
