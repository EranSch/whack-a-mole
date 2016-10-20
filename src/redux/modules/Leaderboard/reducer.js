import { assign } from 'lodash';

import actionTypes from './actionTypes';

const defaultState = {
  isFetching: false,
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
