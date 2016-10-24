import { getLeaderboard } from './api';
import actionTypes from './actionTypes';

export function getLeaders() {
  return (dispatch) => {
    dispatch({ type: actionTypes.LEADERBOARD.LEADERS_REQUEST });
    return getLeaderboard()
      .then(leaders =>
        dispatch({
          type: actionTypes.LEADERBOARD.LEADERS_RECEIVE,
          payload: leaders,
        })
      );
  };
}
