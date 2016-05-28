var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/HTNavigateConstants');
var CHANGE_EVENT = 'change';


var _moods = [];
var i = 0;
var _timerState = 1; /* 1: Running, 2:Stop*/

var HTNavigateStore = assign({}, EventEmitter.prototype, {
  
  getAllMoods:function(){
  	return _moods;
  },

  timerExpire:function(){
     _timerState = 2;
  },

  timerRestart:function(){
     _isTimerRestart = true;
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
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});


HTNavigateStore.dispatchToken = AppDispatcher.register(function(action){

  if(_timerState == 2)
    return true;

	switch(action.actionType) {
      case Constants.HTNAV_ADDMOOD:
        var mood = action.mood;

        if(_moods.length==10)
        {
        	_moods = _moods.slice(1); //REMOVE the first
        	_moods.push(mood) //Add to the first
        } else {
        	_moods.push(mood);
        }
 
        break;

      case Constants.HTNAV_DELMOOD:
        //Only Allow user to delete the last item in the array
        var i = action.index;

        if(_moods.length > 0 && i == 0)
        {
        	_moods.shift();
        } else {
        	_isTimerRestart = false;
        }
        break;

       case Constants.HTNAV_TIMER_EXPIRE:
	       HTNavigateStore.timerExpire();
        break;
       
      default:
	};

	HTNavigateStore.emitChange();

	return true;
});

module.exports = HTNavigateStore;