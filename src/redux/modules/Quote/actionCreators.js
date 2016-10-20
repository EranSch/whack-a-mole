import { getQuote as apiGetQuote } from './api';
import actionTypes from './actionTypes';

export function getQuote(name) {
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
