// Use lodash assign as a cross-browser version of Object.assign.
import { assign } from 'lodash';

import actionTypes from './actionTypes';

const defaultState = {
  currentScore: 0,
  highScore: 0,
  playerName: null,
};

/*
 When the Redux store initializes, it invokes every reducer
 with a state of "undefined".  Using ES2015's default parameter
 syntax, we can define the initial state returned by this reducer.

 After the Redux store initializes, the "state" parameter contains
 only the state managed by this reducer.  For example, the leaderboard
 state is not passed to this reducer.  This differs from other places
 where the "state" parameter appears, like mapStateToProps() which
 receives the state from all reducers.
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    /*
     Reducers can act on any dispatch; not just dispatches in the same
     module.  For example, a new Redux module for "User" might dispatch
     an action for USER.LOGIN that causes this reducer to reset
     currentScore and highScore to zero.
     */
    case actionTypes.GAME.CURRENT_SCORE: {
      /*
       Wherever assign() is used, the first parameter must be a new
       Object.  Otherwise the state object will be mutated, and Redux
       will fail to detect that the dispatched action had any effect on
       state.  Consequently, Redux will prevent the React components
       from re-rendering.

       Redux uses a newState !== oldState test that only passes when the
       two Objects occupy different addresses in memory.  Mutating the
       state will not create a new Object.  This might be annoying when
       writing your reducer, but it allows Redux to do fast detection of
       changed/unchanged state.

       An alternate approach uses the ES2015 spread syntax:
       return {
         ...state,
         propertyName: newValue,
       };
       */
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
    /*
     It is essential to return the state object for any action type
     that this reducer does not use.
     */
    default:
      return state;
  }
}
