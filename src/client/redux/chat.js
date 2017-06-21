import 'rxjs';
import { Observable } from 'rxjs';
import { murmur2 } from 'murmurhash-js';
import { combineEpics } from 'redux-observable';
import createSocket from 'socket.io-client';

//////////////////////////////////////////////////
// Actions

export const CONNECT_REQUEST = 'socket/CONNECT_REQUEST';
export const CONNECT_SUCCESS = 'socket/CONNECT_SUCCESS';
export const MESSAGE_RECEIVED = 'socket/MESSAGE_RECEIVED';
export const SEND_MESSAGE = 'socket/SEND_MESSAGE';
export const DISCONNECT = 'socket/DISCONNECT';

//////////////////////////////////////////////////
// Action creators

export const connectRequest = () => ({
  type: CONNECT_REQUEST
});

export const connectSuccess = () => ({
  type: CONNECT_SUCCESS
});

export const disconnect = () => ({
  type: DISCONNECT
});

export const messageReceived = (message) => ({
  type: MESSAGE_RECEIVED,
  payload: message
});

export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  payload: message
});

//////////////////////////////////////////////////
// Reducers

const initialState = {
  messages: []
}

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MESSAGE_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, payload.message]
      };
    default:
      return state;
  }
};

//////////////////////////////////////////////////
// Epics

// NOTE: Keeping a variable containing the socket here is not a great design pattern. Putting it inside an epic is
// possible and if done right, better, but it would create much more complexity - filtering for multiple action types
// and keeping the socket in the stream using scan - which would make understanding the fundamentals harder.

let socket;

const socketConnectEpic = (action$) => action$
  .ofType(CONNECT_REQUEST)
  .switchMap(() => Observable.create(observer => {
    socket = createSocket('http://localhost:3003')
      .on('connect', () => observer.next(connectSuccess()))
      .on('message', (message) => observer.next(messageReceived({ message })))
      .on('disconnect', () => observer.next(disconnect()))
  }));

const socketSendMessageEpic = (action$) => action$
  .ofType(SEND_MESSAGE)
  .switchMap(
    ({ payload }) => {
      socket.emit('message', payload.message);
      return Observable.empty()
    }
  );

export const epic = combineEpics(
  socketConnectEpic,
  socketSendMessageEpic
);
