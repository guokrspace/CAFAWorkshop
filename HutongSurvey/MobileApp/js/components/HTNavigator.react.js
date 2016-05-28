var React = require('react');
var Store = require('../stores/HTNavigateStore');
var Actions = require('../actions/HTNavigateAction');

var Timer = React.createClass({
  getInitialState: function() {
    return {total: 0};
  },
  tick: function() {
    this.setState({total: this.state.total + 1});
    if(this.state.total == 7200){
		clearInterval(this.interval);
		Actions.expire();
	}
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
	var formatSeconds = function (seconds) {
		var sec_num = seconds; // don't forget the second param
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);

		if (hours   < 10) {hours   = "0"+hours;}
		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}
		return hours+':'+minutes+':'+seconds; 
	};

	var seconds = this.state.total;
	
	var formattedString = formatSeconds(seconds);
    return (
      <h2 className="ui header">TIME ELAPSED: {formattedString}</h2>
    );
  }
});

var DirectionItem = React.createClass({
    getInitialState: function(){
    	return {mood:this.props.mood};
    },

    handleClick: function(){
    	Actions.delete(this.props.index);
    },
    
    componentDidMount: function() {
        Store.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        Store.removeChangeListener(this._onChange);
    },

	render: function(){
	  var text, buttonClasses, iconClasses;
	  
	  if(this.state.mood == 'P'){
	  	text = 'GO LEFT';
	  	buttonClasses = "ui left labeled icon button";
	  	iconClasses="left green arrow icon";
	  }
	  else if(this.state.mood == 'N')
	  {
	  	text = 'GO RIGHT';
	  	buttonClasses = "ui right labeled icon button";
	  	iconClasses="right red arrow icon";
	  }

	  return(
		  <div className="item">
			<button className={buttonClasses} onClick={this.handleClick}>
		      <i className={iconClasses}></i>
	          {text}
			</button>
		  </div>
	  );
	},

	  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState({
    	mood:this.props.mood
    });
  }
});

var HTNavigator = React.createClass({

  getInitialState: function() {
    return {
    	moods:Store.getAllMoods()
    };
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  clickPositiveMood :function(){
  	Actions.create('P');
  },

  clickNagitiveMood :function(){
  	Actions.create('N');
  },

  handleItemClick: function(event){
  	console.log(event);
  	if(event==0 || event.i==0)
    {
    	Actions.delete(0);
    }
  },
  /**
   * @return {object}
   */
  render: function() {
  	var directionItems = [];
    var i;
    for(i=0; i<this.state.moods.length; i++)
    {
    	var mood = this.state.moods[i];

	    var text, buttonClasses, iconClasses;
	  
	    if(mood == 'P'){
	  	  text = 'GO LEFT ';
	  	  buttonClasses = "ui big left labeled icon button";
	  	  iconClasses="left green arrow icon";
	    }
	    else if(mood == 'N')
	    {
	  	  text = 'GO RIGHT';
	  	  buttonClasses = "ui right big labeled icon button";
	  	  iconClasses="right red arrow icon";
	    }

        directionItems.push(
    		<li>
    		  <div className="item">
			    <button className={buttonClasses} onClick={this.handleItemClick.bind(this,i)}>
		          <i className={iconClasses}></i>
	              {text}
			    </button>
		      </div>
    		</li>); 
    }

    return (
      <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui teal center header">
        <div className="content">
           Kinetic HUTONG
        </div>
        </h2>
		<button className="positive big ui button" onClick={this.clickPositiveMood}>Positive Button</button>
		<button className="negative big ui button" onClick={this.clickNagitiveMood}>Negative Button</button>
        <div className="ui stacked segment">
	    
	    <div className="ui list">
		    {directionItems}
	    </div>
	    <div>
	    </div>
        </div>
	    <Timer></Timer>
	  </div>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState({
    	moods:Store.getAllMoods()
    });
  }

});

module.exports = HTNavigator;