import { createStore, applyMiddleware } from 'redux';
import 'whatwg-fetch';
import thunk from 'redux-thunk';

/**
 * Reducers
 */

const reducer = (state = {}, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case 'UPDATE_USER':
      newState.user = action.user;
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
  reducer,
  applyMiddleware(thunk)
);



/**
 * get the user data
 */
const fetchUser = function (username) {
  return fetch(`/showUser/${username}`);
};

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
    type: 'UPDATE_USER',
    user
  };
};

/**
 * construct search request and dispatch actions
 * @param {string} username - the username to search for
 * @returns {function} method that requests the user search
 * and dispatches after the response
 */
actions.searchUser = (username) => {
  return function (dispatch) {
    return dispatch(()=> {
      fetchUser(username)
        .then((response) => response.json())
        .then((user) => dispatch(actions.setUser(user)));
    });
  };
};

export { actions };
export default store;
