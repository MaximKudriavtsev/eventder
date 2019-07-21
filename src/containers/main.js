import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LeafletMap from '../components/leaflet-map/map';
import PostPreview from '../components/post-preview';
import PostPreviewMobile from '../components/post-preview-mobile';
import CommandPanel from '../components/command-panel';
import {
  setMobileDevice,
  getUserLocationInit,
  getEventderPosts,
  getVkPosts
} from '../actions/actions';
import 'leaflet/dist/leaflet.css';

/* eslint-disable react/prop-types */
class Main extends React.PureComponent {
  componentDidMount() {
    const { actions } = this.props;

    actions.setMobileDevice();
    actions.getUserLocationInit();
  }

  componentDidUpdate() {
    const {
      actions,
      searchRadius,
      searchTimeInterval,
      userLocation
    } = this.props;

    actions.getEventderPosts();
    actions.getVkPosts({
      location: userLocation,
      searchRadius,
      searchTimeInterval
    });
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
  store => ({
    userLocation: store.userLocation,
    searchRadius: store.searchRadius,
    searchTimeInterval: store.searchTimeInterval
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        setMobileDevice,
        getUserLocationInit,
        getEventderPosts,
        getVkPosts
      },
      dispatch
    )
  })
)(Main);
