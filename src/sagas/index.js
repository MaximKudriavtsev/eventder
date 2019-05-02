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

const getVkPostsComputed = () => {
  return fetch(
    'https://392veon8m6.execute-api.eu-central-1.amazonaws.com/default/getVkPosts'
  )
    .then(res => res.json())
    .then(res => res);
};

export function* getUserLocation2() {
  const location = yield call(getLocation);
  yield put(actions.getUserLocation(location));
  const posts = yield call(getVkPostsComputed);
  yield put(actions.getPosts(posts));
}

export function* getUserLocation() {
  yield takeEvery(actionTypes.GET_USER_LOCATION, getUserLocation2);
}

export function* getVkPosts2() {
  const posts = yield call(getVkPostsComputed);
  yield put(actions.getPosts(posts));
}

export function* getVkPosts() {
  yield takeEvery('GET_VK_POSTS', getVkPosts2);
}

export function* rootSaga() {
  yield all([getUserLocation()]);
}
