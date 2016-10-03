import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ShelfList from './ShelfList.js';
import CurrentShelfStore from './Stores/CurrentShelfStore.js';

console.log(ShelfList);

/*
	Root Application
*/
var App = React.createClass({
	render: function(){
		return <MuiThemeProvider>
			<ShelfList>
			</ShelfList>
		</MuiThemeProvider>;
	},
	
	componentDidMount: function() {
    CurrentShelfStore.addChangeListener(this._onShelfChange);
  },

  componentWillUnmount: function() {
    CurrentShelfStore.removeChangeListener(this._onShelfChange);
  },
  
  _onShelfChange: function(){
  	console.log(CurrentShelfStore.get());
  	debugger;
  }
});
	
	
ReactDOM.render(
	<App/>,
	document.getElementById("app")	
);
