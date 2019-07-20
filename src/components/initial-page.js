import * as React from 'react';
import { Link } from 'react-router-dom';
import { root, title, logoContainer } from './initial-page.scss';
import SignUp from './utils/sign-up';
import SignOut from './utils/sign-out';

/* eslint-disable react/prop-types */
const InitialPage = ({ userData }) => (
  <div className={root}>
    <div className={logoContainer}>
      <span className={title}>EVENTDER</span>
      {userData ? (
        <div>
          <p>{`Привет, ${userData.name}!`}</p>
          <Link to="/main">
            <div>Открыть карту</div>
          </Link>
          <br />
          <SignOut>
            <a href="/">Выйти</a>
          </SignOut>
        </div>
      ) : (
        <React.Fragment>
          <Link to="/main/">
            <div>Войти как гость</div>
          </Link>
          <br />
          <SignUp>Войти</SignUp>
        </React.Fragment>
      )}
    </div>
  </div>
);

export default InitialPage;
