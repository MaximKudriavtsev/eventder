import * as React from 'react';
import {
  COGNITO_APP_URL,
  COGNITO_CLIENT_ID,
  REDIRECT_URL
} from '../../credentials';

/* eslint-disable react/prop-types */
const SignUp = ({ children }) => (
  <a
    href={`https://${COGNITO_APP_URL}/login?response_type=token&client_id=${COGNITO_CLIENT_ID}&redirect_uri=${REDIRECT_URL}`}
  >
    {children}
  </a>
);

export default SignUp;
