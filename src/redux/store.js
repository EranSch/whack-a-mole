import { createStore } from 'redux';

export default createStore(
  (state = {}) => state,
  {},
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
