var AppDispatcher = require('../Dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Promise = require('es6-promise').Promise;
var assign = require('object-assign');
var reqwest = require('reqwest');

var CHANGE_EVENT = 'change';
var books;

var SearchStore = assign({}, EventEmitter.prototype, {
/*
    getter for the current shelf
    @return {object} the current shelf
  */
  get: function (){
    return {
      books
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
   * respond to events
   * @returns {undefined}
   */
  dispatcherIndex: AppDispatcher.register(function (payload) {
    const action = payload.action;
    let q;

    switch (action.actionType) {
      case 'BOOK_SEARCH':
        q = action.q;
        break;
      default:
        return;
    }

    return new Promise(function (resolve, reject){
      reqwest({
        url: '/search',
        data: {
          q: q
        },
        type: 'json',
        success: function (data){
          books = data.books;
          console.log(data.books);
          resolve();
          SearchStore.emitChange();
        }.bind(this),
        error: reject
      });
    });
  })
});

module.exports = SearchStore;
