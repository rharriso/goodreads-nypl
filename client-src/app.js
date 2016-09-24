import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ShelfList from './ShelfList.js';

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
	}
});
	
	
ReactDOM.render(
	<App/>,
	document.getElementById("app")	
);
