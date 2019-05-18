import { MapLayer, withLeaflet } from 'react-leaflet';
import L from 'leaflet';

require('leaflet.markercluster');

// docs here https://www.npmjs.com/package/react-leaflet-markercluster
// current workaround here https://github.com/YUzhva/react-leaflet-markercluster/issues/71#issuecomment-403071677
class MarkerClusterGroup extends MapLayer {
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

export default withLeaflet(MarkerClusterGroup);
