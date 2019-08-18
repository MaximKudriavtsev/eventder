import * as React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAlertMessage } from '../actions/actions';
import SignUp from './utils/sign-up';
import { root, container } from './alert-message.scss';

const AlertMessage = ({ alertMessage, actions }) => {
  if (!alertMessage.message) return null;
  return (
    <div className={root}>
      <div className={container}>
        <Alert color="info" toggle={() => actions.setAlertMessage({})}>
          {alertMessage.message}
          <SignUp>{alertMessage.linkMessage}</SignUp>
        </Alert>
      </div>
    </div>
  );
};

AlertMessage.propTypes = {
  alertMessage: PropTypes.shape({
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    linkMessage: PropTypes.string
  }),
  actions: PropTypes.shape({}).isRequired
};

AlertMessage.defaultProps = {
  alertMessage: {}
};

export default connect(
  store => ({
    alertMessage: store.alertMessage
  }),
  dispatch => ({
    actions: bindActionCreators({ setAlertMessage }, dispatch)
  })
)(AlertMessage);
