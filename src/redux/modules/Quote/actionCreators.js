import { getQuote as apiGetQuote } from './api';
import actionTypes from './actionTypes';

export function getQuote(name) {
  /*
   Returning a function, rather than just a JavaScript object,
   is possible once redux-thunk is installed as middleware in store.js.
   */
  return (dispatch) => {
    return apiGetQuote(name)
      .then(quote => {
        return dispatch({
          type: actionTypes.QUOTE.RECEIVE,
          payload: quote,
        })
      });
  };
}
