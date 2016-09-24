import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import reqwest from 'reqwest';

/*
	Shelf List
*/
var ShelfList = React.createClass({

	render: function(){
		return <List>
			{this.state.shelves.map(function(shelf){
			console.log(shelf.key)
				return <ListItem key={shelf.key}>{shelf.title}</ListItem>
			})}
		</List>;
	},
	
	getInitialState: function(){
		return {
			shelves: []	
		}
	},
	
	componentDidMount: function(){
		reqwest({
			url: "/shelves",
			type: "json",
			success: function(data){
				this.setState({shelves: data});
			}.bind(this)
		});
	}
});

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
