var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/HTNavigateConstants');
var CHANGE_EVENT = 'change';


var _moods = [];
var HTNavigateStore = assign({}, EventEmitter.prototype, {
  
  getAllMoods:function(){
  	return _moods;
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
	switch(action.actionType) {
      case Constants.HTNAV_ADDMOOD:
        var mood = action.mood;
        if(_moods.length==10)
        {
            _moods = _moods.slice(1);
            _moods[0] = mood;
        }else{
	        _moods.push(mood);
        }
        break;
      case Constants.HTNAV_DELMOOD:
        //Only Allow user to delete the last item in the array
        var i = action.index;

        if(_moods.length > 0 && i == 0)
        {
        	_moods.shift();
        }
        break;  
      default:
	};

	HTNavigateStore.emitChange();

	return true;
});

module.exports = HTNavigateStore;