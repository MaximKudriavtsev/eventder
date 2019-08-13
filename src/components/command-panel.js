import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  publishUserFile,
  changeViewport,
  setAlertMessage
} from '../actions/actions';
import {
  inputContainer,
  fileInput,
  inputLabel,
  inputButton
} from './command-panel.scss';
import camera from '../assets/camera.svg';
import hunt from '../assets/hunt.svg';

class CommandPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.resetCurrentLocation = this.resetCurrentLocation.bind(this);
  }

  onChangeHandler(event) {
    const { actions, userLocation, ownerId } = this.props;
    if (ownerId) {
      const file = event.target.files[0];
      actions.publishUserFile({
        file,
        lat: userLocation[0],
        lng: userLocation[1],
        ownerId
      });
    } else {
      actions.setAlertMessage(
        'Для публикации фото необходимо зарегистрироваться'
      );
    }
  }

  resetCurrentLocation() {
    const { actions, userLocation } = this.props;

    actions.changeViewport({
      center: [userLocation[0] || 54.19, userLocation[1] || 37.61],
      zoom: 14
    });
  }

  render() {
    return (
      <div className={inputContainer}>
        <label htmlFor="file" className={inputLabel}>
          <input
            id="file"
            className={fileInput}
            type="file"
            name="file"
            onChange={this.onChangeHandler}
          />
          <img src={camera} alt="add post" className={inputButton} />
        </label>
        <img
          src={hunt}
          className={inputButton}
          alt="Hunt"
          onClick={this.resetCurrentLocation}
        />
      </div>
    );
  }
}

CommandPanel.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  userLocation: PropTypes.number,
  ownerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

CommandPanel.defaultProps = {
  userLocation: null,
  ownerId: null
};

export default connect(
  store => ({
    userLocation: store.userLocation,
    ownerId: store.userData && store.userData.identities[0].userId
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        publishUserFile,
        changeViewport,
        setAlertMessage
      },
      dispatch
    )
  })
)(CommandPanel);
