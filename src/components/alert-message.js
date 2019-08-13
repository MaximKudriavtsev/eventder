import * as React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAlertMessage } from '../actions/actions';

const AlertMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div
      style={{ position: 'absolute', top: '5%', width: '100%', zIndex: 10000 }}
    >
      <div
        style={{
          display: 'flex',
          alignSelf: 'center',
          justifyContent: 'center'
        }}
      >
        <Alert color="info">{message}</Alert>
      </div>
    </div>
  );
};

AlertMessage.propTypes = {
  message: PropTypes.string
};

AlertMessage.defaultProps = {
  message: undefined
};

export default connect(
  store => ({
    message: store.alertMessage
  }),
  dispatch => ({
    actions: bindActionCreators({ setAlertMessage }, dispatch)
  })
)(AlertMessage);
