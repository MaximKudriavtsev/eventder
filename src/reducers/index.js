import * as ActionTypes from '../actions/action-types';

const initialState = {
  posts: [],
  eventderPosts: [],
  userLocation: [null, null],
  userData: null,
  currentPostId: null,
  currentPostsData: {},

  viewport: {
    center: [40.776354, -73.969687],
    zoom: 14
  },
  isPreviewVisible: false,
  isMobileDevice: false,

  searchRadius: 800, // meters
  searchTimeInterval: 1 // hours
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
        userLocation: payload,
        viewport: {
          zoom: 14,
          center: payload
        }
      };
    }

    case ActionTypes.RECEIVE_VK_POSTS: {
      return {
        ...state,
        posts: payload.posts,
        searchRadius: payload.searchRadius,
        searchTimeInterval: payload.searchTimeInterval
      };
    }

    case ActionTypes.RECEIVE_APP_POSTS: {
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

    case ActionTypes.CHANGE_VIEWPORT: {
      return {
        ...state,
        viewport: payload
      };
    }

    case ActionTypes.TOGGLE_POST_PREVIEW_VISIBILITY: {
      return {
        ...state,
        isPreviewVisible: !state.isPreviewVisible
      };
    }

    case ActionTypes.SET_MOBILE_DEVICE: {
      return {
        ...state,
        isMobileDevice: payload
      };
    }

    case ActionTypes.ADD_LIKE: {
      let currentPost = {};
      const nextCurrentPostsData = state.currentPostsData.map(postData => {
        if (postData.id === payload.id) {
          currentPost = {
            ...postData,
            liked_users: postData.liked_users
              ? postData.liked_users.push(payload.userId)
              : [payload.userId],
            liked: postData.liked_users ? postData.liked_users.length + 1 : 1
          };
          return currentPost;
        }
        return postData;
      });
      const nextEventderPostData = state.eventderPosts.map(postData => {
        if (postData.id === payload.id) {
          return currentPost;
        }
        return postData;
      });

      return {
        ...state,
        eventderPosts: nextEventderPostData,
        currentPostsData: nextCurrentPostsData
      };
    }

    case ActionTypes.REMOVE_LIKE: {
      let currentPost = {};
      const nextCurrentPostsData = state.currentPostsData.map(postData => {
        if (postData.id === payload.id) {
          currentPost = {
            ...postData,
            liked_users: postData.liked_users
              ? postData.liked_users.filter(userId => userId !== payload.userId)
              : [],
            liked: postData.liked_users ? postData.liked_users.length - 1 : 0
          };
          return currentPost;
        }
        return postData;
      });
      const nextEventderPostData = state.eventderPosts.map(postData => {
        if (postData.id === payload.id) {
          return currentPost;
        }
        return postData;
      });

      return {
        ...state,
        eventderPosts: nextEventderPostData,
        currentPostsData: nextCurrentPostsData
      };
    }

    default: {
      return state;
    }
  }
};
