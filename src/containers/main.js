import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from '../components';
import PostPreview from '../components/post-preview';
import FileUploader from '../components/file-uploader';

import * as rootActions from '../actions/actions';

/* eslint-disable react/prop-types */
class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: props.userLocation[0] || 54.19,
        longitude: props.userLocation[1] || 37.61,
        zoom: 14
      },
      previewVisible: false
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
    const { posts, currentPostData, actions } = this.props;
    const { viewport: stateViewport, previewVisible } = this.state;
    const { publishUserFile } = actions;

    return (
      <React.Fragment>
        <Map
          posts={posts}
          viewport={stateViewport}
          onViewportChange={this.changeViewport}
          onMarkerClick={this.onMarkerClick}
        />
        <FileUploader publishUserFile={publishUserFile} />
        <PostPreview
          open={previewVisible}
          postData={currentPostData}
          toggleVisible={this.changePostPreviewVisible}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  x => x,
  dispatch => ({ actions: bindActionCreators(rootActions, dispatch) })
)(Main);
