import { put, call, takeEvery, all } from 'redux-saga/effects';
import * as actions from '../actions/actions';
import * as actionTypes from '../actions/action-types';

const getLocation = () => {
  return new Promise(res => {
    const geoSuccess = position => {
      res([position.coords.latitude, position.coords.longitude]);
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  }).then(res => res);
};

export function* getUserLocation2() {
  const location = yield call(getLocation);
  yield put(actions.getUserLocation(location));
}

export function* getUserLocation() {
  yield takeEvery(actionTypes.GET_USER_LOCATION, getUserLocation2);
}

export function* rootSaga() {
  yield all([getUserLocation()]);
}
