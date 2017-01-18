import _ from 'lodash';
import { createStore } from 'redux';
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
      const { shelf } = action;

      Object.assign(newState, {
        shelf: {
          books: shelf.books,
          page: 1,
          title: shelf.title,
          userId: shelf.userId,
          sortProp: shelf.sortProp || 'position',
          sortDir: shelf.sortDir || 'a',
          isSearchShelf: shelf.title === 'search-result-shelf'
        }
      });
      break;

    case 'APPEND_SHELF_PAGE':
      newState.shelf.page = state.shelf.page + 1;
      newState.shelf.books = newState.shelf.books.concat(action.shelf.books);
      break;

    default:
      console.error(`unhandled action ${action.type}`);
  }

  return newState;
};


/**
 * Store
 */
const store = createStore(reducer);

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
  // sign out
  if (!userName) {
    return store.dispatch({
      type: 'SET_CURR_USER',
      user: undefined
    });
  }

  fetch(`/showUser/${userName}`)
    .then((response) => response.json())
    .then((user) => store.dispatch({
      type: 'SET_CURR_USER',
      user
    }));
};


/**
 *
 */
actions.setShelfSort = function (sortProp, sortDir){
  const isSearchShelf = _.get(store.getState(), 'shelf.isSearchShelf');
  // TODO: Implement local sort
  if (isSearchShelf) {
    console.error('can`t sort search list');
    return;
  }

  const {
    title,
    userId
  } = store.getState().shelf;

  queryShelf(title, userId, {
    page: 0,
    sortProp,
    sortDir
  }).then((shelf) => store.dispatch({
    type: 'SET_CURR_SHELF',
    shelf
  }));
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


actions.search = (q) => {
  const qString = queryString.stringify({q});

  fetch(`/search?${qString}`)
    .then((response) => response.json())
    .then((shelf) => store.dispatch({
      type: 'SET_CURR_SHELF',
      shelf
    }));
};

/**
 *
 */
actions.loadNextShelfPage = () => {
  const {
    title,
    userId,
    page,
    sortProp,
    sortDir
  } = store.getState().shelf;

  queryShelf(title, userId, {
    page: page + 1,
    sortProp,
    sortDir
  }).then((shelf) => store.dispatch({
    type: 'APPEND_SHELF_PAGE',
    shelf
  }));
};


export { actions };
export default store;
