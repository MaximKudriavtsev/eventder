import * as React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import MarkerClusterGroup from './leaflet-marker-cluster';
import { marker, map, eventderMarker } from './leaflet-map.scss';

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
  lng: PropTypes.arrayOf(PropTypes.string).isRequired,
  lat: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
  imageURL: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

const LeafletMap = ({
  position,
  stateViewport,
  posts,
  onMarkerClick,
  eventderPosts
}) => (
  <Map center={position} zoom={stateViewport.zoom} className={map} maxZoom={23}>
    <TileLayer
      url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=wEprA7FVrnTjOteV6Qfz"
      attribution={null}
    />
    <MarkerClusterGroup maxClusterRadius={40}>
      {posts.map(postData => {
        return (
          <IconMarker
            key={postData.preview_url}
            lng={postData.location.lng}
            lat={postData.location.lat}
            imageURL={postData.preview_url}
            className={marker}
            onClick={() => {
              onMarkerClick(postData);
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
            onClick={() => {
              onMarkerClick(postData);
            }}
          />
        );
      })}
    </MarkerClusterGroup>
  </Map>
);

LeafletMap.propTypes = {
  position: PropTypes.arrayOf(PropTypes.string).isRequired,
  stateViewport: PropTypes.shape({}).isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  eventderPosts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onMarkerClick: PropTypes.func.isRequired
};

export default LeafletMap;
