import ListItem from 'material-ui/List/ListItem';
import React from 'react';
import AppDispatcher from './Dispatchers/AppDispatcher';

var ShelfListItem = React.createClass({
	render: function(){
		return <ListItem onClick={this.onClick}>{this.props.shelf.title}</ListItem>
	},
	
	onClick: function(event){
		AppDispatcher.handleViewAction({
			actionType: "CURR_SHELF_CHANGE",
			shelfName: this.props.shelf.title
		});
	}
});

export default ShelfListItem;