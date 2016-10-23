import { assign } from 'lodash';

import actionTypes from './actionTypes';

/*
 The isFetching flag is suggested by the Redux Async tutorial at
 http://redux.js.org/docs/advanced/AsyncActions.html#actions.
 It indicates when an AJAX request is underway, allowing the UI
 to respond by showing a loading spinner, disabling buttons, etc.
 */
const defaultState = {
  isFetching: false,
  /*
   A default value of null is useful to signify that a state
   property is uninitialized.  If we default leaders to an empty
   array (logical, since it ultimately stores an array of results)
   then it's hard to distinguish whether we already fetched this
   value and received no data, or we haven't fetched the data yet.
    */
  leaders: null,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.LEADERBOARD.LEADERS_REQUEST: {
      return assign({}, state, {
        isFetching: true,
      });
    }
    case actionTypes.LEADERBOARD.LEADERS_RECEIVE: {
      return assign({}, state, {
        isFetching: false,
        leaders: action.payload,
      });
    }
    default:
      return state;
  }
}
