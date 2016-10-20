import { assign } from 'lodash';

import actionTypes from './actionTypes';

const defaultState = {
  currentScore: 0,
  highScore: 0,
  playerName: null,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GAME.CURRENT_SCORE: {
      return assign({}, state, {
        currentScore: action.payload,
        highScore: Math.max(state.highScore, action.payload),
      });
    }
    case actionTypes.GAME.PLAYER_NAME: {
      return assign({}, state, {
        playerName: action.payload,
      });
    }
    default:
      return state;
  }
}
