import { MapLayer, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
import { pulsatingCircle, innerBlock } from './cluster-marker.scss';

require('leaflet.markercluster');

// docs here https://www.npmjs.com/package/react-leaflet-markercluster
// current workaround here https://github.com/YUzhva/react-leaflet-markercluster/issues/71#issuecomment-403071677
class ClusterMarker extends MapLayer {
  createLeafletElement(props) {
    // eslint-disable-next-line new-cap
    const el = new L.markerClusterGroup(props);
    this.contextValue = {
      ...props.leaflet,
      layerContainer: el
    };
    return el;
  }
}

export default withLeaflet(ClusterMarker);

export const iconCreateFunction = cluster =>
  L.divIcon({
    html: `<div class=${pulsatingCircle}><div class=${innerBlock}>${cluster.getChildCount()}</div></div>`
  });
