import { assign } from 'lodash';

import actionTypes from './actionTypes';

const defaultState = {
  leaders: null,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.LEADERBOARD.LEADERS_RECEIVE: {
      return assign({}, state, {
        leaders: action.payload,
      });
    }
    default:
      return state;
  }
}
