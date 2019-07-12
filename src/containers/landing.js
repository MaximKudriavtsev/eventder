import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as rootActions from '../actions/actions';
import { Top } from '../components';

const Landing = React.memo(props => <Top {...props} />);

export default connect(
  x => x,
  dispatch => ({ actions: bindActionCreators(rootActions, dispatch) })
)(Landing);
