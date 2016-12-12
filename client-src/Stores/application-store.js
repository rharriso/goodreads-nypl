import { createStore, applyMiddleware, combineReducers } from 'redux';
import fetch from 'whatg-fetch';
import thunk from 'redux-thunk';

/**
 * Reducers
 */

const reducer = (state = {}, action) => {
  console.log(state, action);
  return state;
};

/**
 * ACTIONS
 */
export


/**
 * Store
 */
const store = createStore(
  combineReducers(reducer),
  applyMiddleware(thunk)
);

export default store;
