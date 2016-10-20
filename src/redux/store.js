import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import game from './modules/Game/reducer';

// Divide the Redux store into module "slices".
// On every dispatch, pass the action to every "slice" so it
// can update its state if needed.  Then join all of the "slices"
// to recreate the Redux store.
const reducer = combineReducers({
  game,
});

const middleware = applyMiddleware(thunkMiddleware);

export default createStore(
  reducer,
  {},
  compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
