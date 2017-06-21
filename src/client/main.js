import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import { CONNECT_REQUEST, SEND_MESSAGE } from './redux/chat';
import { createStore } from './redux/index';
import App from './components/App.js';

const store = createStore();

store.dispatch({ type: CONNECT_REQUEST });

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
