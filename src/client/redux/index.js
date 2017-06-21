import 'rxjs';
import Rx, { Observable } from 'rxjs';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import { murmur2 } from 'murmurhash-js';
import { createLogger } from 'redux-logger'
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { combineReducers, applyMiddleware, createStore as _createStore } from 'redux';

import { reducer as basketReducer, epic as basketEpic } from './basket';
import { reducer as chatReducer, epic as chatEpic } from './chat';

const rootReducer = combineReducers({
  basket: basketReducer,
  chat: chatReducer,
});

const rootEpic = combineEpics(
  basketEpic,
  chatEpic
);

export const createStore = () => _createStore(
  rootReducer,
  applyMiddleware(
    createEpicMiddleware(rootEpic),
    createLogger({ collapsed: true })
  )
);
