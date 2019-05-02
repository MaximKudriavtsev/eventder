import * as React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import styles, { root, title } from './top.scss';

import checkCookie from '../../utils/check-cookie';

import {
  COGNITO_APP_URL,
  COGNITO_CLIENT_ID,
  COGNITO_REDIRECT_URL
} from '../../credentials';

export default () => {
  const userData = checkCookie('userData');
  if (userData) return <Redirect to="/main" />;

  return (
    <div className={root}>
      <div className={styles['logo-container']}>
        <span className={title}>EVENTDER</span>
        <Link to="/main/">
          <div>Sing in as a guest</div>
        </Link>
        <br />
        <a
          href={`https://${COGNITO_APP_URL}/login?response_type=token&client_id=${COGNITO_CLIENT_ID}&redirect_uri=${COGNITO_REDIRECT_URL}/auth`}
        >
          Log In
        </a>
      </div>
    </div>
  );
};
