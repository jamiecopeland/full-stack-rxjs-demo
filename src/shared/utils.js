const { Observable } = require('rxjs');
const fetch = require('isomorphic-fetch');

// Fetch JSON via promise
export const fetchJSON = (url) => fetch(url).then(response => response.json());

// Fetch JSON via Observables
export const fetchJSON$ = (url) => Observable.fromPromise(fetchJSON(url));
