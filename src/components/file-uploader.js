import * as React from 'react';
import PropTypes from 'prop-types';
import {
  inputContainer,
  fileInput,
  inputLabel,
  inputButton
} from './file-uploader.scss';
import camera from '../assets/camera.svg';
import hunt from '../assets/hunt.svg';

class FileUploader extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event) {
    const { publishUserFile, lat, lng, ownerId } = this.props;
    const file = event.target.files[0];
    publishUserFile({ file, lat, lng, ownerId });
  }

  render() {
    const { changeCurrentLocation } = this.props;

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
          onClick={changeCurrentLocation}
        />
      </div>
    );
  }
}

FileUploader.propTypes = {
  changeCurrentLocation: PropTypes.func,
  publishUserFile: PropTypes.func,
  lat: PropTypes.number,
  lng: PropTypes.number,
  ownerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

FileUploader.defaultProps = {
  changeCurrentLocation: () => undefined,
  publishUserFile: () => undefined,
  lat: null,
  lng: null,
  ownerId: null
};

export default FileUploader;
