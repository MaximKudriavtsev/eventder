import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Map } from "../components";

import * as actions from "../actions/actions";

class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 54.19,
        longitude: 37.61,
        zoom: 11
      }
    };

    // eslint-disable-next-line react/prop-types
    props.actions.getUserLocation();
  }

  render() {
    const { viewport: stateVieport } = this.state;
    return (
      <Map
        viewport={stateVieport}
        onViewportChange={viewport => {
          this.setState(viewport);
        }}
      />
    );
  }
}

export default connect(
  x => x,
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Main);
