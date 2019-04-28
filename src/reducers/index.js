import * as ActionTypes from '../actions/action-types';
import posts from '../../scraper-vk/result.json';

const initialState = {
  posts,
  userLocation: [null, null],
  currentPostId: null,
  currentPostData: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ERROR: {
      console.log('ERROR');
      console.log(payload);
      return state;
    }

    case ActionTypes.RECEIVE_USER_LOCATION: {
      return {
        ...state,
        userLocation: payload
      };
    }

    case ActionTypes.CHANGE_CURRENT_POST_DATA: {
      console.log(payload);
      return {
        ...state,
        currentPostData: payload
      };
    }

    default: {
      return state;
    }
  }
};
