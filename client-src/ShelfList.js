import List from 'material-ui/List/List';
import React from 'react';
import reqwest from 'reqwest';
import ShelfListItem from './ShefListItem';

/*
	Shelf List
*/
var ShelfList = React.createClass({

	render: function(){
		return <List>
			{this.state.shelves.map(function(shelf){
				return <ShelfListItem shelf={shelf} key={shelf.key}></ShelfListItem>
			})}
		</List>;
	},
	
	getInitialState: function(){
		return {
			shelves: []	
		};
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

export default ShelfList;
