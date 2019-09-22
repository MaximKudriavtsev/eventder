import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/app';
import configureStore from './store';
import rootSaga from './sagas';
import './index.scss';
import Head from './components/head';

const store = configureStore();

store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Head />
    <App />
  </Provider>,
  document.getElementById('root')
);
