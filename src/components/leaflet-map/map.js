import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map, TileLayer, Marker } from 'react-leaflet'; // Polygon
import * as rootActions from '../../actions/actions';
import ClusterMarker, { iconCreateFunction } from './cluster-marker';
import { marker, map, eventderMarker } from './map.scss';
import IconMarker, { CustomIcon2 } from './icon-marker';
// import circleCoordinates from '../../utils/circle-coordinates';
import { TILE_LAYER_URL, MARKER_CURRENT_URL } from './constants';

class LeafletMap extends React.PureComponent {
  constructor() {
    super();

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClusterClick = this.onClusterClick.bind(this);
  }

  onMarkerClick(postData) {
    const { actions } = this.props;

    actions.togglePostPreviewVisibility();
    actions.changeCurrentPostData(postData);
  }

  onClusterClick(event) {
    const markers = event.sourceTarget
      .getAllChildMarkers()
      .map(item => item.options.postData);
    this.onMarkerClick(markers);
  }

  render() {
    const {
      posts,
      eventderPosts,
      userLocation,
      viewport
      // searchRadius
    } = this.props;

    const initial = [userLocation[0] || 20, userLocation[1] || 20];
    // const polygonCircle = [
    //   circleCoordinates(initial[0], initial[1], 1000), // outer ring km
    //   circleCoordinates(initial[0], initial[1], (searchRadius * 2) / 1000) // hole km
    // ];
    return (
      <Map
        center={viewport.center}
        zoom={viewport.zoom}
        className={map}
        maxZoom={23}
        animate={false}
        viewport={viewport}
      >
        <TileLayer url={TILE_LAYER_URL} attribution={null} />
        <ClusterMarker
          maxClusterRadius={40}
          onClusterClick={this.onClusterClick}
          iconCreateFunction={iconCreateFunction}
        >
          {posts.map(postData => {
            return (
              <IconMarker
                key={postData.preview_url}
                lng={postData.location.lng}
                lat={postData.location.lat}
                imageURL={postData.preview_url}
                className={marker}
                postData={postData}
                onClick={() => {
                  this.onMarkerClick(postData);
                }}
              />
            );
          })}
          {eventderPosts.map(postData => {
            return (
              <IconMarker
                key={postData.preview_url}
                lng={postData.location.lng}
                lat={postData.location.lat}
                imageURL={postData.preview_url}
                className={eventderMarker}
                postData={postData}
                onClick={() => {
                  this.onMarkerClick(postData);
                }}
              />
            );
          })}
        </ClusterMarker>
        <Marker
          position={initial}
          zIndexOffset={1000}
          icon={
            new CustomIcon2({
              iconUrl: MARKER_CURRENT_URL
            })
          }
        />
        {/* <Polygon positions={polygonCircle} color="#00b9cb" /> */}
      </Map>
    );
  }
}

LeafletMap.propTypes = {
  userLocation: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  viewport: PropTypes.shape({}).isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  eventderPosts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  actions: PropTypes.shape({}).isRequired
  // searchRadius: PropTypes.number.isRequired
};

export default connect(
  store => ({
    userLocation: store.userLocation,
    posts: store.posts,
    eventderPosts: store.eventderPosts,
    viewport: store.viewport
    // searchRadius: store.searchRadius
  }),
  dispatch => ({ actions: bindActionCreators(rootActions, dispatch) })
)(LeafletMap);
