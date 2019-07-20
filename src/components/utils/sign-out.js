import * as React from 'react';
import Cookie from 'js-cookie';
import { connect } from 'react-redux';
import { setUserData as setUserDataAction } from '../../actions/actions';
import { clickable } from './sign-out.scss';

const signOut = removeUserData => () => {
  Cookie.remove('userData');
  removeUserData();
};

/* eslint-disable react/prop-types */
const SignOut = ({ children, removeUserData }) => {
  return (
    <div className={clickable} onClick={signOut(removeUserData)}>
      {children}
    </div>
  );
};

export default connect(
  () => ({}),
  dispatch => ({ removeUserData: () => dispatch(setUserDataAction(null)) })
)(SignOut);
