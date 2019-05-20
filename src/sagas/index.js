import { put, call, takeEvery, all, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import * as actions from '../actions/actions';
import * as actionTypes from '../actions/action-types';

import postsVk from '../../scraper-vk/result.json';

const SEARCH_RADIUS = 1000;

const getLocation = () => {
  return new Promise(res => {
    const geoSuccess = position => {
      res([position.coords.latitude, position.coords.longitude]);
    };
    const geoReject = () => {
      res([54.19, 37.61]);
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoReject);
  }).then(res => res);
};

const getVkPostsComputedBase = (lat, long) => {
  const makeDateInterval = () =>
    Math.floor(new Date().getTime() / 1000 - 1 * 60 * 60);

  return fetch(
    `https://392veon8m6.execute-api.eu-central-1.amazonaws.com/default/getVkPosts?lat=${lat}&long=${long}&radius=${SEARCH_RADIUS}&startTime=${makeDateInterval()}`,
    {
      mode: 'cors'
    }
  )
    .then(res => res.json())
    .then(res => res);
};

const getVkPostsComputed = (lat, long) => () => {
  if (process.env.BASE_NAME === '/site/') {
    // use local data without execute Lambda
    const makeDateInterval = () =>
      Math.floor(new Date().getTime() / 1000 - 1 * 60 * 60);

    return fetch(
      `https://392veon8m6.execute-api.eu-central-1.amazonaws.com/default/getVkPosts?lat=${lat}&long=${long}&radius=${SEARCH_RADIUS}&startTime=${makeDateInterval()}`,
      {
        mode: 'cors'
      }
    )
      .then(res => res.json())
      .then(res => res);
  }
  return postsVk;
};

const getEventderPostsComputed = () => {
  return fetch(
    'https://j0mho994nd.execute-api.eu-central-1.amazonaws.com/dev/records',
    {
      mode: 'cors'
    }
  )
    .then(res => res.json())
    .then(res => res);
};

const publishUserFileComputed = ({ file, lat, lng, ownerId }) => () => {
  const reader = new FileReader();
  reader.readAsBinaryString(file);

  alert('Началась загрузка фото 🚀\nМожет занять какое-то время');

  fetch(
    `https://pgu80wwqs6.execute-api.eu-central-1.amazonaws.com/dev/files?lat=${lat}&lng=${lng}&ownerId=${ownerId}`,
    {
      method: 'POST',
      body: file,
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then(res => {
      res.text();
    })
    .then(() => {
      put(actions.successPublishUserFile());
      alert('Фото успешно загружено 👌');
    })
    .catch(error => {
      put(actions.errorPublishUserFile(error));
      alert('Фото не загрузилось 😱 \nПопробуй ещё раз');
    });

  put(actions.loading());
};

function createEventChannelEventder() {
  return eventChannel(emitter => {
    // initial call
    getEventderPostsComputed().then(res => emitter(res));
    let endCallsTime = 500; // ~ 1.6 hour
    const iv = setInterval(() => {
      endCallsTime -= 1;
      if (endCallsTime > 0) {
        getEventderPostsComputed().then(res => emitter(res));
      } else {
        emitter(END);
      }
    }, 10000);
    return () => {
      clearInterval(iv);
    };
  });
}

function createEventChannelVk(location) {
  return eventChannel(emitter => {
    // initial call
    getVkPostsComputedBase(location[0], location[1]).then(res => emitter(res));
    let endCallsTime = 100; // ~ 1.6 hour
    const iv = setInterval(() => {
      endCallsTime -= 1;
      if (endCallsTime > 0) {
        getVkPostsComputedBase(location[0], location[1]).then(res =>
          emitter(res)
        );
      } else {
        emitter(END);
      }
    }, 70000);
    return () => {
      clearInterval(iv);
    };
  });
}

export function* saga(location) {
  const vkChain = yield call(createEventChannelVk, location);
  try {
    while (true) {
      const vkPosts = yield take(vkChain);
      yield put(actions.getPosts(vkPosts));
    }
  } finally {
    console.log('countdown terminated');
  }
}

function* sagaEventder() {
  const eventderChain = yield call(createEventChannelEventder, 4);
  try {
    while (true) {
      const eventderPosts = yield take(eventderChain);
      yield put(actions.getEventderPosts(eventderPosts));
    }
  } finally {
    console.log('countdown terminated');
  }
}

export function* getUserLocation2() {
  const location = yield call(getLocation);
  yield put(actions.getUserLocation(location));

  // const vkPosts = yield call(getVkPostsComputed(location[0], location[1]));
  // yield put(actions.getPosts(vkPosts));

  // const eventderPosts = yield call(getEventderPostsComputed);
  // yield put(actions.getEventderPosts(eventderPosts));

  // call every time
  yield saga(location);
  // yield sagaEventder();
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
  yield all([getUserLocation(), publishUserFile(), sagaEventder()]);
}
