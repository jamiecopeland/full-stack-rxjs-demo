import { murmur2 } from 'murmurhash-js';
import { fetchJSON$ } from '../../shared/utils';

//////////////////////////////
// Actions

const FETCH_BASKET_REQUEST = 'FETCH_BASKET_REQUEST';
const FETCH_BASKET_SUCCESS = 'FETCH_BASKET_SUCCESS';
const FETCH_BASKET_ERROR = 'FETCH_BASKET_ERROR';

export const fetchBasketRequest = (payload) => ({ type: FETCH_BASKET_REQUEST, payload });
export const fetchBasketSuccess = (payload) => ({ type: FETCH_BASKET_SUCCESS, payload });
export const fetchBasketError = () => ({ type: FETCH_BASKET_ERROR });

//////////////////////////////
// Reducer

export const reducer = (state = {}, action) => {
  switch(action.type) {
    case FETCH_BASKET_REQUEST:
      return {
        ...state,
      }

    case FETCH_BASKET_SUCCESS:
      return {
        ...state,
        [action.payload.hash]: action.payload.basket
      };

    default:
      return state;
  }
};

//////////////////////////////
// API

const fetchBasket$ = (searchParams) => fetchJSON$('http://localhost:3001/api/basket', searchParams);

//////////////////////////////
// Epics

export const epic = (action$) => action$
  .ofType(FETCH_BASKET_REQUEST)
  .switchMap(
    ({ payload }) => fetchBasket$(payload)
      .map(basket => fetchBasketSuccess({ basket }))
  );
