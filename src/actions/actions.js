import * as ActionTypes from './action-types';

export const getUserLocation = payload => ({
  type: ActionTypes.RECEIVE_USER_LOCATION,
  payload
});

export const testAction = () => ({
  type: 'TEST',
  payload: 'test'
});

export const getUserLocationInit = () => ({
  type: ActionTypes.GET_USER_LOCATION
});
