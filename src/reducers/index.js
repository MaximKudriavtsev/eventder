import * as ActionTypes from '../actions/action-types';

const initialState = {
  posts: [],
  eventderPosts: [],
  userLocation: [null, null],
  userData: null,
  currentPostId: null,
  currentPostsData: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ERROR: {
      console.log('ERROR');
      console.log(payload);
      return state;
    }

    case ActionTypes.LOADING: {
      return {
        ...state,
        loading: true
      };
    }

    case ActionTypes.SUCCESS_PUBLISH_USER_FILE: {
      console.log('File has been uploaded');
      return {
        ...state,
        loading: false
      };
    }

    case ActionTypes.ERROR_PUBLISH_USER_FILE: {
      console.log('Error');
      console.log(payload);
      return {
        ...state,
        loading: false
      };
    }

    case ActionTypes.RECEIVE_USER_LOCATION: {
      return {
        ...state,
        userLocation: payload
      };
    }

    case ActionTypes.RECEIVE_POSTS: {
      return {
        ...state,
        posts: payload
      };
    }

    case ActionTypes.RECEIVE_EVENTDER_POSTS: {
      return {
        ...state,
        eventderPosts: payload
      };
    }

    case ActionTypes.CHANGE_CURRENT_POST_DATA: {
      return {
        ...state,
        currentPostsData: Array.isArray(payload) ? payload : [payload]
      };
    }

    case ActionTypes.SET_USER_DATA: {
      return {
        ...state,
        userData: payload
      };
    }

    default: {
      return state;
    }
  }
};
