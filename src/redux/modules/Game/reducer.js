import { assign } from 'lodash';

const defaultState = {
  currentScore: 0,
  highScore: 0,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'GAME_CURRENT_SCORE': {
      return assign({}, state, {
        currentScore: action.payload,
        highScore: Math.max(state.highScore, action.payload),
      });
    }
    default:
      return state;
  }
}
