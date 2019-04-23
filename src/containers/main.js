import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from '../components';

import * as actions from '../actions/actions';

/* eslint-disable react/prop-types */
class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: props.userLocation[0] || 54.19,
        longitude: props.userLocation[1] || 37.61,
        zoom: 14
      }
    };

    props.actions.getUserLocationInit();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { viewport: prevViewport } = prevState;
    const { userLocation } = nextProps;

    return {
      viewport: {
        ...prevViewport,
        latitude: userLocation[0],
        longitude: userLocation[1]
      }
    };
  }

  render() {
    const { viewport: stateViewport } = this.state;
    return (
      <Map
        viewport={stateViewport}
        onViewportChange={viewport => {
          this.setState(viewport);
        }}
      />
    );
  }
}

export default connect(
  x => x,
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Main);
