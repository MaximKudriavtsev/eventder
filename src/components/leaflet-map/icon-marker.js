import * as React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'leaflet';
import { Marker } from 'react-leaflet';

const CustomIcon = Icon.extend({
  options: {
    iconSize: [70, 70],
    iconAnchor: [35, 35]
  }
});

export const CustomIcon2 = Icon.extend({
  options: {
    iconSize: [50, 80],
    iconAnchor: [25, 80]
  }
});

const IconMarker = ({
  lng,
  lat,
  onClick,
  imageURL,
  className,
  ...restProps
}) => (
  <Marker
    position={[lat, lng]}
    onClick={onClick}
    icon={
      new CustomIcon({
        iconUrl: imageURL,
        className
      })
    }
    {...restProps}
  />
);

IconMarker.propTypes = {
  lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onClick: PropTypes.func.isRequired,
  imageURL: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

export default IconMarker;
