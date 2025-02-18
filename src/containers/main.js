import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LeafletMap from '../components/leaflet-map/map';
import PostPreview from '../components/post-preview';
import PostPreviewMobile from '../components/post-preview-mobile';
import CommandPanel from '../components/command-panel';
import preventSafariBoundEffect from '../utils/prevent-safari-bound';
import Guide from '../components/guide';
import {
  setMobileDevice,
  getUserLocation,
  getAppPosts,
  getVkPosts,
  setGuideVisibility
} from '../actions/actions';
import checkCookie from '../utils/check-cookie';
import 'leaflet/dist/leaflet.css';

/* eslint-disable react/prop-types */
class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    if (checkCookie('guide')) {
      props.actions.setGuideVisibility(false);
    }
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.setMobileDevice();
    actions.getUserLocation();

    document.ontouchmove = preventSafariBoundEffect;
  }

  componentDidUpdate() {
    const {
      actions,
      // searchRadius,
      searchTimeInterval,
      // userLocation,
      viewport
    } = this.props;

    // eslint-disable-next-line no-restricted-properties
    const nextRadius = (Math.pow(2, 20 - viewport.zoom) * 37.5) / 4;
    console.log(nextRadius);
    console.log(viewport.zoom);

    actions.getAppPosts({
      location: viewport.center,
      searchRadius: 100000,
      searchTimeInterval: 0 // 0 - fetch data from all time
    });
    actions.getVkPosts({
      location: viewport.center,
      searchRadius: nextRadius,
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
    viewport: store.viewport,
    userLocation: store.userLocation,
    searchRadius: store.searchRadius,
    searchTimeInterval: store.searchTimeInterval,
    isGuideOpen: store.isGuideOpen
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        setGuideVisibility,
        setMobileDevice,
        getUserLocation,
        getAppPosts,
        getVkPosts
      },
      dispatch
    )
  })
)(Main);
