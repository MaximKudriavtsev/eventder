import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LeafletMap from '../components/leaflet-map/map';
import PostPreview from '../components/post-preview';
import PostPreviewMobile from '../components/post-preview-mobile';
import CommandPanel from '../components/command-panel';
import Guide from '../components/guide';
import {
  setMobileDevice,
  getUserLocation,
  getAppPosts,
  getVkPosts
} from '../actions/actions';
import 'leaflet/dist/leaflet.css';

/* eslint-disable react/prop-types */
class Main extends React.PureComponent {
  componentDidMount() {
    const { actions } = this.props;

    actions.setMobileDevice();
    actions.getUserLocation();
  }

  componentDidUpdate() {
    const {
      actions,
      searchRadius,
      searchTimeInterval,
      userLocation
    } = this.props;

    actions.getAppPosts({
      location: userLocation,
      searchRadius,
      searchTimeInterval: 0 // 0 - fetch data from all time
    });
    actions.getVkPosts({
      location: userLocation,
      searchRadius,
      searchTimeInterval
    });
  }

  render() {
    const { isMobileDevice, isGuideOpen } = this.props;

    return (
      <React.Fragment>
        <LeafletMap />

        {isMobileDevice ? <PostPreviewMobile /> : <PostPreview />}

        <CommandPanel />
        {isGuideOpen && <Guide />}
      </React.Fragment>
    );
  }
}

export default connect(
  store => ({
    userLocation: store.userLocation,
    searchRadius: store.searchRadius,
    searchTimeInterval: store.searchTimeInterval,
    isGuideOpen: store.isGuideOpen
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        setMobileDevice,
        getUserLocation,
        getAppPosts,
        getVkPosts
      },
      dispatch
    )
  })
)(Main);
