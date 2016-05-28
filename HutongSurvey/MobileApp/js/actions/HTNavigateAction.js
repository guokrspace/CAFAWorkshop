var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/HTNavigateConstants');

var HTNavigateActions = {
	create: function(mood){
		AppDispatcher.dispatch({
			actionType: Constants.HTNAV_ADDMOOD,
			mood:mood
		});
	},

	delete: function(i){
      AppDispatcher.dispatch({
		  actionType: Constants.HTNAV_DELMOOD,
		  index:i
	  });
    },

    expire: function(){
      AppDispatcher.dispatch({
		  actionType: Constants.HTNAV_TIMER_EXPIRE
	  });
    }
};

module.exports = HTNavigateActions;
