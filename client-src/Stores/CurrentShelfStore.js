var AppDispatcher = require('../Dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Promise = require('es6-promise').Promise;
var assign = require('object-assign');
var reqwest = require('reqwest');

var CHANGE_EVENT = 'change';
var shelf;
var shelfTitle;
var sortDir;
var sortProp;

var CurrentShelfStore = assign({}, EventEmitter.prototype, {
/*
    getter for the current shelf
    @return {object} the current shelf
  */
  get: function (){
    return {
      books: shelf.books,
      sortDir,
      sortProp
    };
  },

  emitChange: function (){
    this.emit(CHANGE_EVENT);
  },


  /**
   * @param {function} callback - response message
   * @returns undefined
   */
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },


  /**
   *
   */
  dispatcherIndex: AppDispatcher.register(function (payload) {
    const action = payload.action;

    switch (action.actionType) {
      case 'CURR_SHELF_CHANGE':
        shelfTitle = action.shelfName;
        sortDir = undefined;
        sortProp = undefined;
        break;
      case 'SHELF_SORT_CHANGE':
        sortDir = action.sortDir;
        sortProp = action.sortProp;
        break;
      default:
        throw new Error('Uknown event: ' + action.actionType);
    }

    return new Promise(function (resolve, reject){
      reqwest({
        url: '/shelf/' + shelfTitle,
        data: {
          sortProp: payload.action.sortProp,
          sortDir: payload.action.sortDir
        },
        type: 'json',
        success: function (data){
          shelf = data;
          resolve();
          CurrentShelfStore.emitChange();
        }.bind(this),
        error: reject
      });
    });
  })
});

module.exports = CurrentShelfStore;
