import * as ActionTypes from "./action-types";

// eslint-disable-next-line
export const getUserLocation = () => {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by this browser.");
  }
  let payload = [null, null];
  navigator.geolocation.getCurrentPosition(position => {
    payload = [position.coords.latitude, position.coords.longitude];
  });

  return {
    type: ActionTypes.RECEIVE_USER_LOCATION,
    payload
  };
};

export const testAction = () => ({
  type: "TEST",
  payload: "test"
});
