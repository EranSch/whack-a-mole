import actionTypes from './actionTypes';

export function saveCurrentScore(score) {
  return {
    type: actionTypes.GAME.CURRENT_SCORE,
    payload: score,
  };
}
