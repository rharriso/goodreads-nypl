var AppDispatcher = require('../Dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Promise = require("es6-promise").Promise;
var assign = require('object-assign');
var reqwest = require("reqwest");

var CHANGE_EVENT = 'change';
var currentShelf;

var goodreads = require('goodreads');
var gr = new goodreads.client({ 
  'key': "sRdquosmKQPAD84gKb0qQ",
  'secret': "lnJccQqCjK2TPK2KH8iRuBszoesL6GQSeGOnHilbTA"
});

var CurrentShelfStore = assign({}, EventEmitter.prototype, {
	
	/*
		getter for the current shelf
		@return {object} the current shelf
	*/
	get: function(){
		return currentShelf;	
	},
	
	emitChange: function() {
    this.emit(CHANGE_EVENT);
  },


  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  
 
  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },


  /**
   *
   */  
	dispatcherIndex: AppDispatcher.register(function(payload) {
		return new Promise(function(resolve, reject){
		  reqwest({
				url: "/shelf/" + payload.action.shelfName,
				type: "json",
				success: function(data){
					currentShelf = data;
					resolve();
          CurrentShelfStore.emitChange();
				}.bind(this),
				error: reject	
			});
		});
  })
});

module.exports = CurrentShelfStore;
