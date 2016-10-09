import React from 'react';

import AppDispatcher from './Dispatchers/AppDispatcher';
import FlatButton from 'material-ui/FlatButton';
import ListItem from 'material-ui/List/ListItem';

var BookListItem = React.createClass({

	render: function(){
		return <ListItem>{this.props.book.title}
      
      <FlatButton
        label="audiobook" 
        href={'http://browse.nypl.org/iii/encore/search/C__S['+this.props.book.title+']__Orightresult__U?lang=eng&suite=def'}
      />
    </ListItem>
	},
});

export default BookListItem;
