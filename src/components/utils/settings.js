import { connect } from 'react-redux';
import { setUserData as setUserDataAction } from '../../actions/actions';
import checkCookie from '../../utils/check-cookie';

/* eslint-disable react/prop-types */
const Settings = props => {
  const userData = checkCookie('userData');
  const { userData: storeUserData } = props;
  if (userData && !storeUserData) {
    props.setUserData(userData);
  }

  return null;
};

export default connect(
  () => ({}),
  dispatch => ({
    setUserData: userData => dispatch(setUserDataAction(userData))
  })
)(Settings);
