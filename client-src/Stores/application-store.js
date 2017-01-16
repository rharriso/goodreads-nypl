import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import queryString from 'query-string';
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
      Object.assign(newState, {
        shelf: {
          books: action.shelf.books,
          sortProp: 'position',
          sortDir: 'a',
          page: 0
        }
      });
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

/*
 * action helpers
 */

/**
 * Search for shelf data
 * @param {string} shelfTitle - title of shelf to query
 * @param {string} userId - the id of the user who owns the shelf
 * @param {object} queryParams - extra query params
 * @returns {Promise} promise of shelf data
 */
function queryShelf(shelfTitle, userId, queryParams = {}) {
  queryParams.userId = userId;
  const qString = queryString.stringify(queryParams);

  return fetch(`/shelf/${shelfTitle}?${qString}`)
          .then((response) => response.json());
}


/*
 * actions
 */
const actions = {};


/**
 * set the current user
 * @param {Object} userName - the user data
 * @return {Action} object describing an action
 */
actions.setUser = (userName) => {
  return store.dispatch((() => {
    return (dispatch) => {
      fetch(`/showUser/${userName}`)
        .then((response) => response.json())
        .then((user) => dispatch({
          type: 'SET_CURR_USER',
          user
        }));
    };
  })());
};


/**
 * fetch store info and dispatch actions
 * @param {string} shelfTitle - title of shelf to set
 * @param {string} userId - owner of the shelf
 * @returns {Dispatch} dispatch of async handler
 */
actions.setShelf = (shelfTitle, userId) => {
  queryShelf(shelfTitle, userId)
    .then((shelf) => store.dispatch({
      type: 'SET_CURR_SHELF',
      shelf
    }));
};


export { actions };
export default store;
