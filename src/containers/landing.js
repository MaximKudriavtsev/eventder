import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as rootActions from '../actions/actions';
import InitialPage from '../components/initial-page';
import Auth from '../components-utils/auth';

/* eslint-disable react/prop-types */
const Landing = props => {
  const { userData } = props;
  return (
    <React.Fragment>
      <Auth {...props} />
      <InitialPage userData={userData} />
    </React.Fragment>
  );
};

export default connect(
  store => ({ userData: store.userData }),
  dispatch => ({ actions: bindActionCreators(rootActions, dispatch) })
)(Landing);
