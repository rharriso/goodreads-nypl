import List from 'material-ui/List/List';
import React from 'react';
import reqwest from 'reqwest';
import BookListItem from './BookListItem';

/*
  Book List
  */
var BookList = React.createClass({

  render: function(){
    return <List>
      {this.props.books.map(function(book){
        return <BookListItem book={book} key={book.key}></BookListItem>
      })}
      </List>;
  },

  getDefaultProperties: function(){
    return {
      books: []	
    }
  }
});

export default BookList;
