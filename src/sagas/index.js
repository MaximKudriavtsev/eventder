import { put, call, takeEvery, all } from 'redux-saga/effects';
import * as actions from '../actions/actions';
import * as actionTypes from '../actions/action-types';

import postsVk from '../../scraper-vk/result.json';

// Moscow 55.752865, 37.622173
// const SEARCH_RADIUS = 1000;

const getLocation = () => {
  return new Promise(res => {
    const geoSuccess = position => {
      res([position.coords.latitude, position.coords.longitude]);
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  }).then(res => res);
};

const getVkPostsComputed = (/* lat, long */) => () => {
  // const makeDateInterval = () =>
  //   Math.floor(new Date().getTime() / 1000 - 1 * 60 * 60);

  // return fetch(
  //   `https://392veon8m6.execute-api.eu-central-1.amazonaws.com/default/getVkPosts?lat=${lat}&long=${long}&radius=${SEARCH_RADIUS}&startTime=${makeDateInterval()}`
  // )
  //   .then(res => res.json())
  //   .then(res => res);

  return postsVk;
};

const publishUserFileComputed = file => () => {
  fetch(
    'https://ofc5fkliu0.execute-api.eu-central-1.amazonaws.com/default/saveUserFile',
    {
      method: 'POST',
      body: file,
      mode: 'no-cors'
    }
  )
    .then(() => {
      put(actions.successPublishUserFile());
    })
    .catch(error => {
      put(actions.errorPublishUserFile(error));
    });

  put(actions.loading());
};

export function* getUserLocation2() {
  const location = yield call(getLocation);
  yield put(actions.getUserLocation(location));
  const posts = yield call(getVkPostsComputed(location[0], location[1]));
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

export function* publishUserFile2({ payload }) {
  yield call(publishUserFileComputed(payload));
}

export function* publishUserFile() {
  yield takeEvery(actionTypes.PUBLISH_USER_FILE, publishUserFile2);
}

export function* rootSaga() {
  yield all([getUserLocation(), publishUserFile()]);
}
