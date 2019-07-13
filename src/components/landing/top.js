import * as React from 'react';
import { Link } from 'react-router-dom';
import styles, { root, title } from './top.scss';
import Auth from '../auth';
import SignUp from '../sign-up';
import SignOut from '../sign-out';

/* eslint-disable react/prop-types */
const Landing = React.memo(props => {
  const { userData } = props;

  return (
    <div className={root}>
      <Auth {...props} />

      <div className={styles['logo-container']}>
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
});

export default Landing;
