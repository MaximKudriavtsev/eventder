import * as React from "react";
import PropTypes from "prop-types";
import MapGL from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { root } from "./map.scss";

const Map = ({ viewport, onViewportChange, ...restProps }) => (
  <MapGL
    className={root}
    mapStyle="mapbox://styles/mapbox/light-v9"
    accessToken="pk.eyJ1IjoiZXZlbnRkZXIiLCJhIjoiY2p1andwZXBwMDZ2dDN6bDh3aGltbWtyYiJ9.3YFTGz3UOIZs5H_tbs6XYg"
    onViewportChange={onViewportChange}
    latitude={viewport.latitude}
    longitude={viewport.longitude}
    zoom={viewport.zoom}
    {...restProps}
  />
);

export default Map;

Map.propTypes = {
  viewport: {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number
  },
  onViewportChange: PropTypes.func.isRequired
};

Map.defaultProps = {
  viewport: {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number
  }
};
