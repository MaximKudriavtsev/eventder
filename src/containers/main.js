import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LeafletMap from '../components/leaflet-map/map';
import PostPreview from '../components/post-preview';
import PostPreviewMobile from '../components/post-preview-mobile';
import CommandPanel from '../components/command-panel';
import { setMobileDevice, getUserLocationInit } from '../actions/actions';
import 'leaflet/dist/leaflet.css';

/* eslint-disable react/prop-types */
class Main extends React.PureComponent {
  componentDidMount() {
    const { actions } = this.props;

    // TODO: should be move into Saga loading
    actions.setMobileDevice();
    actions.getUserLocationInit();
  }

  render() {
    const { isMobileDevice } = this.props;

    return (
      <React.Fragment>
        <LeafletMap />

        {isMobileDevice ? <PostPreviewMobile /> : <PostPreview />}

        <CommandPanel />
      </React.Fragment>
    );
  }
}

export default connect(
  store => store,
  dispatch => ({
    actions: bindActionCreators(
      { setMobileDevice, getUserLocationInit },
      dispatch
    )
  })
)(Main);
