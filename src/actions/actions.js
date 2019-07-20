import * as ActionTypes from './action-types';
import isMobileDevice from '../utils/is-mobile-device';

export const getUserLocation = payload => ({
  type: ActionTypes.RECEIVE_USER_LOCATION,
  payload
});

export const getUserLocationInit = () => ({
  type: ActionTypes.GET_USER_LOCATION
});

export const changeCurrentPostData = payload => ({
  type: ActionTypes.CHANGE_CURRENT_POST_DATA,
  payload
});

export const getPosts = payload => ({
  type: ActionTypes.RECEIVE_POSTS,
  payload
});

export const getEventderPosts = payload => ({
  type: ActionTypes.RECEIVE_EVENTDER_POSTS,
  payload
});

export const publishUserFile = payload => ({
  type: ActionTypes.PUBLISH_USER_FILE,
  payload
});

export const successPublishUserFile = () => ({
  type: ActionTypes.SUCCESS_PUBLISH_USER_FILE
});

export const errorPublishUserFile = payload => ({
  type: ActionTypes.ERROR_PUBLISH_USER_FILE,
  payload
});

export const loading = () => ({
  type: ActionTypes.LOADING
});

export const setUserData = payload => ({
  type: ActionTypes.SET_USER_DATA,
  payload
});

export const addLike = payload => {
  fetch(
    'https://pgu80wwqs6.execute-api.eu-central-1.amazonaws.com/dev/addLike',
    {
      mode: 'no-cors',
      method: 'POST',
      body: JSON.stringify({ id: payload.id, userId: payload.userId })
    }
  );
  return {
    type: ActionTypes.ADD_LIKE,
    payload
  };
};

export const removeLike = payload => {
  fetch(
    'https://pgu80wwqs6.execute-api.eu-central-1.amazonaws.com/dev/removeLike',
    {
      mode: 'no-cors',
      method: 'POST',
      body: JSON.stringify({ id: payload.id, userId: payload.userId })
    }
  );
  return {
    type: ActionTypes.REMOVE_LIKE,
    payload
  };
};

export const changeViewport = payload => ({
  type: ActionTypes.CHANGE_VIEWPORT,
  payload
});

export const togglePostPreviewVisibility = () => ({
  type: ActionTypes.TOGGLE_POST_PREVIEW_VISIBILITY
});

export const setMobileDevice = () => ({
  type: ActionTypes.SET_MOBILE_DEVICE,
  payload: isMobileDevice()
});
