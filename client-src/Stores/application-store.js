import { createStore } from 'redux';
import 'whatwg-fetch'; /* global fetch */

/**
 * Reducers
 */

const reducer = (state = {}, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case 'SET_CURR_USER':
      newState.user = action.user;
      break;
    case 'SET_CURR_SHELF':
      newState.shelf = action.shelf;
      break;
    default:
      console.error(`unhandled action ${action.type}`);
  }

  return newState;
};


/**
 * Store
 */
const store = createStore(
  reducer
);


/*
 * actions
 */
const actions = {};


/**
 * set the current user
 * @param {Object} user - the user data
 * @return {Action} object describing an action
 */
actions.setUser = (user) => {
  return {
    type: 'SET_CURR_USER',
    user
  };
};


/**
 *
 */
actions.setShelf = (shelf) => {
  return {
    type: 'SET_CURR_SHELF',
    shelf
  };
};


export { actions };
export default store;
