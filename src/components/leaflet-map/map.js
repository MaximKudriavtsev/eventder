import * as React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker, Polygon } from 'react-leaflet';
import ClusterMarker, { iconCreateFunction } from './cluster-marker';
import { marker, map, eventderMarker } from './map.scss';
import IconMarker, { CustomIcon2 } from './icon-marker';
import circleCoordinates from '../../utils/circle-coordinates';
import { TILE_LAYER_URL, MARKER_CURRENT_URL } from './constants';

class LeafletMap extends React.PureComponent {
  constructor() {
    super();

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClusterClick = this.onClusterClick.bind(this);
  }

  onMarkerClick(data) {
    const { onMarkerClick } = this.props;
    onMarkerClick(data);
  }

  onClusterClick(event) {
    const { onMarkerClick } = this.props;
    const markers = event.sourceTarget
      .getAllChildMarkers()
      .map(item => item.options.postData);
    onMarkerClick(markers);
  }

  render() {
    const {
      position,
      stateViewport,
      posts,
      eventderPosts,
      initialPosition,
      ...restProps
    } = this.props;

    const initial = [initialPosition[0] || 20, initialPosition[1] || 20];

    const polygonCircle = [
      circleCoordinates(initial[0], initial[1], 1000), // outer ring
      circleCoordinates(initial[0], initial[1], 3) // hole
    ];
    return (
      <Map
        center={position}
        zoom={stateViewport.zoom}
        className={map}
        maxZoom={23}
        {...restProps}
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
        <Polygon positions={polygonCircle} color="#00b9cb" />
      </Map>
    );
  }
}

LeafletMap.propTypes = {
  position: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  initialPosition: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  stateViewport: PropTypes.shape({}).isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  eventderPosts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onMarkerClick: PropTypes.func.isRequired
};

export default LeafletMap;
