/*
 The values of these constants (e.g. 'GAME_CURRENT_SCORE')
 is not important except that the value will appear in loggers
 like Redux DevTools.

 More importantly, the value must be unique within the application.
 Otherwise the reducers cannot distinguish the identically-named
 actions types.
 */
export default {
  GAME: {
    CURRENT_SCORE: 'GAME_CURRENT_SCORE',
    PLAYER_NAME: 'GAME_PLAYER_NAME',
  }
};
