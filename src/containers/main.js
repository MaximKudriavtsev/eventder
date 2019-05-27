import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LeafletMap } from '../components';
import PostPreview from '../components/post-preview';
import PostPreviewMobile from '../components/post-preview-mobile';
import FileUploader from '../components/file-uploader';
import * as rootActions from '../actions/actions';
import isMobileDevice from '../utils/is-mobile-device';
import 'leaflet/dist/leaflet.css';

const ownerId = '4444'; // owner id from AWS cognito

/* eslint-disable react/prop-types */
class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        center: [
          props.userLocation[0] || 54.19,
          props.userLocation[1] || 37.61
        ],
        zoom: 14
      },
      previewVisible: false,
      mobileDevice: null
    };

    props.actions.getUserLocationInit();
    this.changeViewport = viewport => {
      this.setState({ viewport });
    };
    this.changePostPreviewVisible = () => {
      const { previewVisible } = this.state;
      this.setState({ previewVisible: !previewVisible });
    };
    this.onMarkerClick = postData => {
      this.changePostPreviewVisible();
      props.actions.changeCurrentPostData(postData);
    };
    this.resetCurrentLocation = () => {
      const { userLocation } = this.props;

      this.setState({
        viewport: {
          center: [userLocation[0] || 54.19, userLocation[1] || 37.61],
          zoom: 14
        }
      });
    };
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

  componentDidMount() {
    if (isMobileDevice()) {
      this.setState({ mobileDevice: true });
    } else {
      this.setState({ mobileDevice: false });
    }
  }

  render() {
    const {
      posts,
      currentPostsData,
      actions,
      userLocation,
      eventderPosts
    } = this.props;
    const {
      viewport: stateViewport,
      previewVisible,
      mobileDevice
    } = this.state;
    const { publishUserFile } = actions;

    return (
      <React.Fragment>
        <LeafletMap
          position={stateViewport.center}
          stateViewport={stateViewport}
          viewport={stateViewport}
          onViewportChange={this.changeViewport}
          posts={posts}
          eventderPosts={eventderPosts}
          onMarkerClick={this.onMarkerClick}
          animate={false}
          initialPosition={userLocation}
        />
        {mobileDevice ? (
          <PostPreviewMobile
            open={previewVisible}
            postsData={currentPostsData}
            toggleVisible={this.changePostPreviewVisible}
          />
        ) : (
          <PostPreview
            open={previewVisible}
            postsData={currentPostsData}
            toggleVisible={this.changePostPreviewVisible}
          />
        )}
        <FileUploader
          publishUserFile={publishUserFile}
          lat={userLocation[0]}
          lng={userLocation[1]}
          ownerId={ownerId}
          changeCurrentLocation={this.resetCurrentLocation}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  x => x,
  dispatch => ({ actions: bindActionCreators(rootActions, dispatch) })
)(Main);
