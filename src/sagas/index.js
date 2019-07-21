import {
  put,
  call,
  takeEvery,
  all,
  take,
  takeLatest
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import * as actions from '../actions/actions';
import * as actionTypes from '../actions/action-types';

const makeDateInterval = hours =>
  Math.floor(new Date().getTime() / 1000 - hours * 60 * 60);

const getLocation = () => {
  return new Promise(res => {
    const geoSuccess = position => {
      res([position.coords.latitude, position.coords.longitude]);
    };
    const geoReject = () => {
      res([40.776354, -73.969687]); // The New York City
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoReject);
  }).then(res => res);
};

const getVkPostsComputedBase = (
  lat,
  long,
  searchRadius,
  searchTimeInterval
) => {
  return fetch(
    `https://392veon8m6.execute-api.eu-central-1.amazonaws.com/default/getVkPosts?lat=${lat}&long=${long}&radius=${searchRadius}&startTime=${makeDateInterval(
      searchTimeInterval
    )}`,
    {
      mode: 'cors'
    }
  )
    .then(res => res.json())
    .then(res => res);
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

  alert('Началась загрузка фото 🚀\nЭто может занять какое-то время');

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

function createEventChannelVk({ location, searchRadius, searchTimeInterval }) {
  let searchTime = searchTimeInterval;
  let radius = searchRadius;

  const whileFetch = emitter => {
    getVkPostsComputedBase(location[0], location[1], radius, searchTime).then(
      res => {
        if (res.length < 30) {
          searchTime += 24; // time is not very important for searches
          radius += 200; // vk api works fine with radius is above 1000
          return whileFetch(emitter);
        }
        return emitter({
          posts: res,
          searchRadius: radius,
          searchTimeInterval: searchTime
        });
      }
    );
  };

  return eventChannel(emitter => {
    whileFetch(emitter);

    let endCallsTime = 100; // ~ 1.6 hour
    const iv = setInterval(() => {
      endCallsTime -= 1;
      if (endCallsTime > 0) {
        getVkPostsComputedBase(
          location[0],
          location[1],
          radius,
          searchTime
        ).then(res =>
          emitter({
            posts: res,
            searchRadius: radius,
            searchTimeInterval: searchTime
          })
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

function* publishUserFile({ payload }) {
  yield call(publishUserFileComputed(payload));
}

function* publishUserFileSaga() {
  yield takeEvery(actionTypes.PUBLISH_USER_FILE, publishUserFile);
}

function* getUserLocationBase() {
  const location = yield call(getLocation);
  yield put(actions.receiveUserLocation(location));
}

function* getUserLocationSaga() {
  yield takeEvery(actionTypes.GET_USER_LOCATION, getUserLocationBase);
}

// eslint-disable-next-line no-unused-vars
function createEventChannelApp({ location, searchRadius, searchTimeInterval }) {
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

// eslint-disable-next-line no-unused-vars
function* getAppPostsBase({ payload }) {
  // const { location, searchRadius, searchTimeInterval } = payload;

  const appChain = yield call(createEventChannelApp, {
    // location,
    // searchRadius,
    // searchTimeInterval
  });
  try {
    while (true) {
      const appPosts = yield take(appChain);
      yield put(actions.receiveAppPosts(appPosts));
    }
  } finally {
    console.log('countdown terminated');
  }
}

function* getAppPostsSaga() {
  yield takeLatest(actionTypes.GET_APP_POSTS, getAppPostsBase);
}

function* getVkPostsBase({ payload }) {
  const { location, searchRadius, searchTimeInterval } = payload;

  const vkChain = yield call(createEventChannelVk, {
    location,
    searchRadius,
    searchTimeInterval
  });
  try {
    while (true) {
      const vkPosts = yield take(vkChain);
      yield put(actions.receiveVkPosts(vkPosts));
    }
  } finally {
    console.log('countdown terminated');
  }
}

function* getVkPostsSaga() {
  yield takeEvery(actionTypes.GET_VK_POSTS, getVkPostsBase);
}

export default function* rootSaga() {
  yield all([
    getUserLocationSaga(),
    getAppPostsSaga(),
    getVkPostsSaga(),
    publishUserFileSaga()
  ]);
}
