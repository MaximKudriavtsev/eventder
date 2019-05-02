import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Marker } from '@urbica/react-map-gl';

const style = {
  width: '30px',
  height: '30px',
  color: '#fff',
  background: '#1978c8',
  borderRadius: '30px',
  textAlign: 'center'
};

const ClusterMarker = ({ longitude, latitude, pointCount }) => (
  <Marker longitude={longitude} latitude={latitude}>
    <div style={{ ...style, background: '#f28a25' }}>{pointCount}</div>
  </Marker>
);

ClusterMarker.propTypes = {
  longitude: PropTypes.number,
  latitude: PropTypes.number,
  pointCount: PropTypes.number
};

ClusterMarker.defaultProps = {
  longitude: 0,
  latitude: 0,
  pointCount: 0
};

export default ClusterMarker;
