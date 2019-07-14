import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Marker } from '@urbica/react-map-gl';
import { clusterMarker } from './cluster-marker.scss';

const ClusterMarker = ({ longitude, latitude, pointCount }) => (
  <Marker longitude={longitude} latitude={latitude}>
    <div className={clusterMarker}>{pointCount}</div>
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
