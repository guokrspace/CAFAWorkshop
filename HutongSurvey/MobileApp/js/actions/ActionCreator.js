'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var HTNavigateConstants = require('../constants/HTNavigateConstants');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var Api = require('../Api');

var ActionCreator = {

  /**
   *
   *
   */

  addDirection: function (direction) {
    Api
      .get('http://hutong.guokrspace.com:81/server.php?update=kyle&direction=' + direction)
      .then(function (mood) {
        AppDispatcher.dispatch({
          actionType: HTNavigateConstants.HTNAV_ADDMOOD,
          mood: direction
        });
      })
      .catch(function () {
        AppDispatcher.dispatche({
          actionType: HTNavigatorConstants.HTNAV_SERVER_ERROR,
          error: '提交失败，请检查网络连接后重试'
        });      
      });
  }
};

module.exports = ActionCreator;