import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/app";
import configureStore from "./store";
import getUserLocation from "./sagas";
import "./index.scss";

const store = configureStore();
store.runSaga(getUserLocation);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
