import * as React from 'react';
import PropTypes from 'prop-types';
import MapGL, { Marker } from '@urbica/react-map-gl';
import Cluster from '@urbica/react-map-gl-cluster';
import 'mapbox-gl/dist/mapbox-gl.css';
import { root, marker } from './map.scss';
import ClusterMarker from './cluster-marker';
import currentMarker from '../assets/current-marker.svg';

const Map = ({
  viewport,
  onViewportChange,
  posts,
  eventderPosts,
  onMarkerClick,
  ...restProps
}) => (
  <MapGL
    className={root}
    mapStyle="mapbox://styles/mapbox/light-v9"
    accessToken="pk.eyJ1IjoiZXZlbnRkZXIiLCJhIjoiY2p1andwZXBwMDZ2dDN6bDh3aGltbWtyYiJ9.3YFTGz3UOIZs5H_tbs6XYg"
    onViewportChange={onViewportChange}
    latitude={viewport.latitude}
    longitude={viewport.longitude}
    zoom={viewport.zoom}
    {...restProps}
  >
    <Marker
      offset={[0, -25]}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
    >
      <img src={currentMarker} alt="You are here" className={marker} />
    </Marker>
    <Cluster radius={40} extent={512} nodeSize={64} component={ClusterMarker}>
      {posts.map(postData => (
        <Marker
          offset={[0, -66]}
          key={postData.id}
          latitude={postData.location.lat}
          longitude={postData.location.lng}
        >
          <svg
            width="13vh"
            height="17vh"
            viewBox="0 0 120 167"
            fill="none"
            onClick={() => onMarkerClick(postData)}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M60.3969 0.855835C60.2359 0.855835 60.0751 0.856587 59.9145 0.858087V0.858097C59.7543 0.856604 59.5939 0.855857 59.4333 0.855857C31.4859 0.855857 8.83008 23.5117 8.83008 51.4591C8.83008 61.6609 11.849 71.1576 17.0422 79.1046L59.915 149.774L59.915 102.062L59.911 102.06L59.9151 102.06L59.9191 102.06L59.915 102.062L59.915 149.774L102.786 79.108C107.98 71.1604 111 61.6624 111 51.4591C111 23.5117 88.3443 0.855835 60.3969 0.855835ZM59.9149 74.5144C72.2959 74.5144 82.3327 64.4776 82.3327 52.0966C82.3327 39.7156 72.2959 29.6788 59.9149 29.6788C47.5339 29.6788 37.4972 39.7156 37.4972 52.0966C37.4972 64.4776 47.5339 74.5144 59.9149 74.5144Z"
              fill="#00B9CB"
            />
            <defs>
              <clipPath id="cut-off-bottom">
                <circle cx="45" cy="45" r="43.5" />
              </clipPath>
            </defs>

            <image
              x="1%"
              y="0%"
              width="87"
              height="87"
              clipPath="url(#cut-off-bottom)"
              transform="translate(15, 6)"
              xlinkHref={postData.preview_url}
            />
          </svg>
        </Marker>
      ))}
      {eventderPosts.map(postData => (
        <Marker
          offset={[0, -66]}
          key={postData.id}
          latitude={postData.location.lat}
          longitude={postData.location.lng}
        >
          <svg
            width="13vh"
            height="17vh"
            viewBox="0 0 120 167"
            fill="none"
            onClick={() => onMarkerClick(postData)}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M60.3969 0.855835C60.2359 0.855835 60.0751 0.856587 59.9145 0.858087V0.858097C59.7543 0.856604 59.5939 0.855857 59.4333 0.855857C31.4859 0.855857 8.83008 23.5117 8.83008 51.4591C8.83008 61.6609 11.849 71.1576 17.0422 79.1046L59.915 149.774L59.915 102.062L59.911 102.06L59.9151 102.06L59.9191 102.06L59.915 102.062L59.915 149.774L102.786 79.108C107.98 71.1604 111 61.6624 111 51.4591C111 23.5117 88.3443 0.855835 60.3969 0.855835ZM59.9149 74.5144C72.2959 74.5144 82.3327 64.4776 82.3327 52.0966C82.3327 39.7156 72.2959 29.6788 59.9149 29.6788C47.5339 29.6788 37.4972 39.7156 37.4972 52.0966C37.4972 64.4776 47.5339 74.5144 59.9149 74.5144Z"
              fill="#CC0070"
            />
            <defs>
              <clipPath id="cut-off-bottom">
                <circle cx="45" cy="45" r="43.5" />
              </clipPath>
            </defs>

            <image
              x="1%"
              y="0%"
              width="87"
              height="87"
              clipPath="url(#cut-off-bottom)"
              transform="translate(15, 6)"
              xlinkHref={postData.preview_url}
            />
          </svg>
        </Marker>
      ))}
    </Cluster>
  </MapGL>
);

export default Map;

Map.propTypes = {
  viewport: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number
  }),
  onViewportChange: PropTypes.func.isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object),
  eventderPosts: PropTypes.arrayOf(PropTypes.object)
};

Map.defaultProps = {
  viewport: {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number
  },
  posts: [],
  eventderPosts: []
};
