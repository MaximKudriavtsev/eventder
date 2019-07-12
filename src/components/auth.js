import * as React from 'react';
import { Redirect } from 'react-router';
import jose from 'node-jose';
import Cookie from 'js-cookie';
import findToken from '../utils/find-token';

export default class Auth extends React.PureComponent {
  render() {
    // eslint-disable-next-line react/prop-types
    const { location } = this.props;

    if (location && location.hash) {
      const { hash } = location;
      const idToken = findToken(hash, 'id_token');
      const payload = jose.util.base64url.decode(idToken.split('.')[1]);
      const userData = JSON.parse(payload);

      Cookie.set('userData', userData, { path: '/' });

      return <Redirect to="/main" />;
    }
    return null;
  }
}
