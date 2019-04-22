import * as ActionTypes from '../actions/action-types';

const initialState = {
  images: [],
  userLocation: [null, null]
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ERROR: {
      console.log('ERROR');
      console.log(payload);
      return state;
    }

    case ActionTypes.RECEIVE_USER_LOCATION: {
      console.log(payload);
      return {
        ...state,
        userLocation: payload
      };
    }

    default: {
      return state;
    }
  }
};
