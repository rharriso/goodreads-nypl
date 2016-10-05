import ListItem from 'material-ui/List/ListItem';
import React from 'react';
import AppDispatcher from './Dispatchers/AppDispatcher';

var BookListItem = React.createClass({
	render: function(){
		return <ListItem>{this.props.book.title}</ListItem>
	},
});

export default BookListItem;
