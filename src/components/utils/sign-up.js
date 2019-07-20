import * as React from 'react';
import { COGNITO_APP_URL, COGNITO_CLIENT_ID } from '../../credentials';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.redirectUrl = process.env.BASE_NAME
      ? 'https://maximkudriavtsev.github.io/site/'
      : 'http://localhost:3000/';
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;

    return (
      <a
        href={`https://${COGNITO_APP_URL}/login?response_type=token&client_id=${COGNITO_CLIENT_ID}&redirect_uri=${
          this.redirectUrl
        }`}
      >
        {children}
      </a>
    );
  }
}
