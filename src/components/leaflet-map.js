import * as React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { marker, map } from './leaflet-map.scss';

const CustomIcon = Icon.extend({
  options: {
    iconSize: [120, 167],
    iconAnchor: [90, 167]
  }
});

class IconMarker extends React.PureComponent {
  render() {
    const { lng, lat, onClick, imageURL, ...restProps } = this.props;
    return (
      <Marker
        position={[lat, lng]}
        onClick={() => {
          onClick();
        }}
        icon={
          new CustomIcon({
            iconUrl: imageURL,
            className: marker
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
  imageURL: PropTypes.string.isRequired
};

const LeafletMap = ({ position, stateViewport, posts, onMarkerClick }) => (
  <Map center={position} zoom={stateViewport.zoom} className={map}>
    <TileLayer
      url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=wEprA7FVrnTjOteV6Qfz"
      attribution={null}
    />
    {/* <RouteMarker /> */}
    {posts.map(postData => {
      return (
        <IconMarker
          key={postData.preview_url}
          lng={postData.location.lng}
          lat={postData.location.lat}
          imageURL={postData.preview_url}
          onClick={() => {
            onMarkerClick(postData);
          }}
        />
      );
    })}
  </Map>
);

LeafletMap.propTypes = {
  position: PropTypes.arrayOf(PropTypes.string).isRequired,
  stateViewport: PropTypes.shape({}).isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onMarkerClick: PropTypes.func.isRequired
};

export default LeafletMap;
