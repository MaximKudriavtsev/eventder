import * as React from 'react';
import { inputContainer, fileInput, inputLabel } from './file-uploader.scss';
import addButton from '../assets/add-image.svg';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event) {
    // eslint-disable-next-line react/prop-types
    const { publishUserFile } = this.props;
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    publishUserFile(file);
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
          <img src={addButton} alt="add post" />
        </label>
      </div>
    );
  }
}
