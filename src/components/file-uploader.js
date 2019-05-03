import * as React from 'react';

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
      <div style={{ position: 'absolute', bottom: '30px' }}>
        <input type="file" name="file" onChange={this.onChangeHandler} />
      </div>
    );
  }
}
