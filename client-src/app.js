import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var App = React.createClass({
	render: function(){
		return <MuiThemeProvider>
			<h1>HEYO</h1>
		</MuiThemeProvider>;
	}
});


ReactDOM.render(
	<App/>,
	document.getElementById("app")	
);