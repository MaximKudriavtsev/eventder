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
