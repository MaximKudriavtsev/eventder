import * as ActionTypes from './action-types';

export const getUserLocation = payload => ({
  type: ActionTypes.RECEIVE_USER_LOCATION,
  payload
});

export const testAction = () => ({
  type: 'TEST',
  payload: 'test'
});
