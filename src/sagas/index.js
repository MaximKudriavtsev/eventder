import { put, call } from 'redux-saga/effects';
import * as actions from '../actions/actions';

const getLocation = () => {
  return new Promise(res => {
    const geoSuccess = position => {
      console.log(position);
      res([position.coords.latitude, position.coords.longitude]);
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  }).then(res => res);
};

export default function* getUserLocation() {
  const location = yield call(getLocation);
  yield put(actions.getUserLocation(location));
}
