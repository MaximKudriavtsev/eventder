import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import Reducers from "../reducers";

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(Reducers, applyMiddleware(sagaMiddleware)),
    runSaga: sagaMiddleware.run
  };
};
