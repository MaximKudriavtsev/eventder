import * as React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import MarkerClusterGroup from './leaflet-marker-cluster';
import {
  marker,
  map,
  eventderMarker,
  pulsatingCircle,
  innerBlock
} from './leaflet-map.scss';

/* eslint-disable react/no-multi-comp */

const iconCreateFunction = cluster =>
  L.divIcon({
    html: `<div class=${pulsatingCircle}><div class=${innerBlock}>${cluster.getChildCount()}</div></div>`
  });

const CustomIcon = Icon.extend({
  options: {
    iconSize: [100, 130],
    iconAnchor: [75, 130]
  }
});

class IconMarker extends React.PureComponent {
  render() {
    const { lng, lat, onClick, imageURL, className, ...restProps } = this.props;
    return (
      <Marker
        position={[lat, lng]}
        onClick={() => {
          onClick();
        }}
        icon={
          new CustomIcon({
            iconUrl: imageURL,
            className
          })
        }
        {...restProps}
      />
    );
  }
}

IconMarker.propTypes = {
  lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onClick: PropTypes.func.isRequired,
  imageURL: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

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
    const { position, stateViewport, posts, eventderPosts } = this.props;

    return (
      <Map
        center={position}
        zoom={stateViewport.zoom}
        className={map}
        maxZoom={23}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=wEprA7FVrnTjOteV6Qfz"
          attribution={null}
        />
        <MarkerClusterGroup
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
        </MarkerClusterGroup>
      </Map>
    );
  }
}

LeafletMap.propTypes = {
  position: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  stateViewport: PropTypes.shape({}).isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  eventderPosts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onMarkerClick: PropTypes.func.isRequired
};

export default LeafletMap;
