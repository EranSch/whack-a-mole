export function saveCurrentScore(score) {
  return {
    type: 'GAME_CURRENT_SCORE',
    payload: score,
  };
}
