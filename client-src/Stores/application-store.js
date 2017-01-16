import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
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
  reducer,
  applyMiddleware(thunk)
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
 * fetch store info and dispatch actions
 * @param {string} shelfTitle - title of shelf to set
 * @param {string} userId - owner of the shelf
 */
actions.setShelf = (shelfTitle, userId) => {
  return store.dispatch((() => {
    console.log('setShelf');
    return (dispatch) => {
      console.log(dispatch);
      fetch(`/shelf/${shelfTitle}?userId=${userId}`)
        .then((response) => response.json())
        .then((shelf) => dispatch({
          type: 'SET_CURR_SHELF',
          shelf
        }));
    };
  })());
};


export { actions };
export default store;
