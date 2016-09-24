import ListItem from 'material-ui/List/ListItem';
import React from 'react';
import reqwest from 'reqwest';

var ShelfListItem = React.createClass({
	render: function(){
		return <ListItem>{this.props.shelf.title}</ListItem>
	}	
});

export default ShelfListItem;