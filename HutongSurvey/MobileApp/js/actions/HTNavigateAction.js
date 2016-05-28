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
    }
};

module.exports = HTNavigateActions;
