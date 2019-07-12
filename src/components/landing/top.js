import * as React from 'react';
import { Link } from 'react-router-dom';
import styles, { root, title } from './top.scss';
import Auth from '../auth';
import { COGNITO_APP_URL, COGNITO_CLIENT_ID } from '../../credentials';

/* eslint-disable react/prop-types */
const Landing = React.memo(props => {
  const redirectUrl = process.env.BASE_NAME
    ? 'https://maximkudriavtsev.github.io/site/'
    : 'http://localhost:3000/';
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
          </div>
        ) : (
          <React.Fragment>
            <Link to="/main/">
              <div>Войти как гость</div>
            </Link>
            <br />
            <a
              href={`https://${COGNITO_APP_URL}/login?response_type=token&client_id=${COGNITO_CLIENT_ID}&redirect_uri=${redirectUrl}`}
            >
              Войти
            </a>
          </React.Fragment>
        )}
      </div>
    </div>
  );
});

export default Landing;
