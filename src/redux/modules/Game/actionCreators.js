import actionTypes from './actionTypes';

export function saveCurrentScore(score) {
  /*
   In a vanilla Redux application (no middleware), action
   creators must return a plain JavaScript object.  Add
   middleware in store.js to enhance the power of action
   creators.
   */
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

