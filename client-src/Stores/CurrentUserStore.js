var AppDispatcher = require('../Dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Promise = require('es6-promise').Promise;
var assign = require('object-assign');
var reqwest = require('reqwest');

var CHANGE_EVENT = 'change';
var user;

var CurrentUserStore = assign({}, EventEmitter.prototype, {
/*
    getter for the current shelf
    @return {object} the current shelf
  */
  get: function (){
    return {
      user: user
    };
  },

  emitChange: function (){
    this.emit(CHANGE_EVENT);
  },


  /**
   * @param {function} callback - response message
   * @returns {undefined}
   */
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },


  /**
   *
   */
  dispatcherIndex: AppDispatcher.register(function (payload) {
    const action = payload.action;
    let username = '';

    switch (action.actionType) {
      case 'CURR_USERNAME_SET':
        username = action.username;
        break;
      case 'CURR_USER_UNSET':
        user = undefined;
        AppDispatcher.handleViewAction({
          actionType: 'CURR_SHELF_UNSET'
        });
        CurrentUserStore.emitChange();
        return;
      default:
        return;
    }

    return new Promise(function (resolve, reject){
      reqwest({
        url: '/showUser/' + username,
        type: 'json',
        success: function (data){
          user = data;
          resolve();
          CurrentUserStore.emitChange();
        }.bind(this),
        error: reject
      });
    });
  })
});

module.exports = CurrentUserStore;
