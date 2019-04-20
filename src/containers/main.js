import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../actions/actions";

class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    // eslint-disable-next-line react/prop-types
    props.actions.getUserLocation();
  }

  render() {
    return <span>Map element</span>;
  }
}

export default connect(
  x => x,
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Main);
