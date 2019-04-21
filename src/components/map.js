import * as React from "react";
import MapGL from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { root } from "./map.scss";

export default () => (
  <MapGL
    className={root}
    mapStyle="mapbox://styles/mapbox/light-v9"
    accessToken="pk.eyJ1IjoiZXZlbnRkZXIiLCJhIjoiY2p1andwZXBwMDZ2dDN6bDh3aGltbWtyYiJ9.3YFTGz3UOIZs5H_tbs6XYg"
    latitude={37.78}
    longitude={-122.41}
    zoom={11}
  />
);
