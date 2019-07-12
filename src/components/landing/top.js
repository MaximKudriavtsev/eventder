import * as React from 'react';
import { Link } from 'react-router-dom';
import styles, { root, title } from './top.scss';
import Auth from '../auth';

import checkCookie from '../../utils/check-cookie';

import { COGNITO_APP_URL, COGNITO_CLIENT_ID } from '../../credentials';

export default props => {
  const userData = checkCookie('userData');
  const redirectUrl = process.env.BASE_NAME
    ? 'https://maximkudriavtsev.github.io/site/'
    : 'http://localhost:3000/';

  return (
    <div className={root}>
      <Auth {...props} />

      <div className={styles['logo-container']}>
        <span className={title}>EVENTDER</span>
        {userData ? (
          <Link to="/main">
            <div>Open Map</div>
          </Link>
        ) : (
          <React.Fragment>
            <Link to="/main/">
              <div>Sing in as a guest</div>
            </Link>
            <br />
            <a
              href={`https://${COGNITO_APP_URL}/login?response_type=token&client_id=${COGNITO_CLIENT_ID}&redirect_uri=${redirectUrl}`}
            >
              Log In
            </a>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
