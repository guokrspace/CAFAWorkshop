
var React = require('react')
var Router = require('react-router').Router
var Route = require('react-router').Route
var hashHistory = require('react-router').history
var App = require('./js/components/HTNavigator.react')

React.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    {/* add the routes here */}
  </Router>
), document.getElementById('hutongserveyapp'))