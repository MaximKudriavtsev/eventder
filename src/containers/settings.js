import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as rootActions from '../actions/actions';
import checkCookie from '../utils/check-cookie';

/* eslint-disable react/prop-types */
const Settings = React.memo(props => {
  const userData = checkCookie('userData');
  if (userData && !props.userData) {
    props.actions.setUserData(userData);
  }

  return null;
});

export default connect(
  x => x,
  dispatch => ({ actions: bindActionCreators(rootActions, dispatch) })
)(Settings);
