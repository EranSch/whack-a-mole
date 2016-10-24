import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import game from './modules/Game/reducer';
import leaderboard from './modules/Leaderboard/reducer';

/*
 Divide the Redux store into module "slices".

 On every dispatch, pass the action to every "slice" so it
 can update its state if needed.  Then join all of the "slices"
 to recreate the Redux store.

 Each reducer populates a property of state determined by the object
 keys below.  The ES2015 shorthand object initialization makes this
 less obvious, but consider that the code below is equivalent to:

 const reducer = combineReducers({
   game: game,
   leaderboard: leaderboard,
 });

 Thus the Game and Leaderboard reducers populate state.game and
 state.leaderboard respectively.

 combineReducers() allows you to split your logic into discrete
 domains.  Otherwise you might be stuck with one giant reducer that
 handles every dispatch.  You can use combineReducers() as deep
 as you want; if the Game reducer is growing too big, you could
 split it into state.game.foo and state.game.bar "slices".

 For simplicity the reducer is built here, but you'll often see
 this code split into a separate reducer.js file.
 */

const reducer = combineReducers({
  game,
  leaderboard,
});

/*
 applyMiddleware() accepts an unlimited number of parameters.
 Each parameter is a middleware function with the ability to
 modify the behavior of Redux's dispatch() function.  This is
 a powerful way to extend Redux's functionality.

 For simplicify the middleware is assembled here, but you'll
 often see this code split into a separate middleware.js file.
 */
const middleware = applyMiddleware(thunkMiddleware);

/*
 This application has only one version of createStore().  This loads
 all store enhancers in all environments.  You'll often see separate
 createStore() configurations loaded like:

 if (process.env.NODE_ENV === 'local') {
   module.exports = require('./store.dev.js');
 } else {
   module.exports = require('./store.prod.js');
 }
 */
export default createStore(
  reducer, // the root reducer
  {}, // the initial state; could be loaded from browser storage, a server, etc.
  compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ) // the store enhancer; a chain of functions to add features to Redux
);
