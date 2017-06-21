import express from 'express';
import cors from 'cors';
import fetch  from 'isomorphic-fetch';
import { Observable } from 'rxjs';

import { fetchJSON, fetchJSON$ } from '../shared/utils';

//////////////////////////////////////////////////
// Utils

const rxMiddleware = (handler) =>
  (request, response) =>
    handler(request)
      .subscribe(handlerResponse => response.json(handlerResponse))

//////////////////////////////////////////////////
// API

const fetchBasket$ = (query) => fetchJSON$('http://localhost:3002/api/basket', { query });
const fetchProducts$ = (query) => fetchJSON$('http://localhost:3002/api/products', { query });
const fetchPrices$ = (query) => fetchJSON$('http://localhost:3002/api/prices', { query });

//////////////////////////////////////////////////
// Handlers

const createBasket = (basket, products, prices) => ({
  orderLines: Object
    .keys(basket.orderLines)
    .reduce((acc, orderLineId) => {
      const { productId, quantity } = basket.orderLines[orderLineId];
      return {
        ...acc,
        [orderLineId]: {
          quantity,
          description: products[productId],
          price: prices[productId]
        }
      };
    }, {}),
});

const basketHandler = ({ query }) =>
  fetchBasket$()
    .switchMap((basket) =>
      Observable.forkJoin([fetchProducts$(), fetchPrices$()])
      .map(
        ([ products, prices ]) => createBasket(basket, products, prices)
      )
    );

//////////////////////////////////////////////////
// Initialization

const port = 3001;

express()
  .use(cors())
  .get('/api/basket', rxMiddleware(basketHandler))
  .listen(port, err => err
    ? console.error(err)
    : console.info(`Started local API server: http://localhost:${port}`)
  );
