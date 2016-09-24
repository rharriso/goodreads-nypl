import ListItem from 'material-ui/List/ListItem';
import React from 'react';
import reqwest from 'reqwest';

var ShelfListItem = React.createClass({
	render: function(){
		return <ListItem onClick={this.onClick}>{this.props.shelf.title}</ListItem>
	},
	
	onClick: function(event){
		console.log(this.props.shelf);
	}
});

export default ShelfListItem;