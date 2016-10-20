import actionTypes from './actionTypes';

export function saveCurrentScore(score) {
  return {
    type: actionTypes.GAME.CURRENT_SCORE,
    payload: score,
  };
}

export function savePlayerName(name) {
  return {
    type: actionTypes.GAME.PLAYER_NAME,
    payload: name,
  }
}

