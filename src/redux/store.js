import { createStore, combineReducers } from 'redux';

import game from './modules/Game/reducer';

// Divide the Redux store into module "slices".
// On every dispatch, pass the action to every "slice" so it
// can update its state if needed.  Then join all of the "slices"
// to recreate the Redux store.
const reducer = combineReducers({
  game,
});

export default createStore(
  reducer,
  {},
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
