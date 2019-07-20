import * as ActionTypes from './action-types';

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
  fetch('https://pgu80wwqs6.execute-api.eu-central-1.amazonaws.com/dev/add', {
    mode: 'no-cors',
    method: 'POST',
    body: JSON.stringify({ id: payload.id, userId: payload.userId })
  });
  return {
    type: ActionTypes.ADD_LIKE,
    payload
  };
};

export const removeLike = payload => ({
  type: ActionTypes.REMOVE_LIKE,
  payload
});
