import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
} from 'material-ui/Table';

import React from 'react';
import BookListItem from './BookListItem.jsx';

/*
  Book List
  */
class BookList extends React.Component {
  render (){
    return <div className='book-list'>
      <Table>
        <TableHeader>
          <TableHeaderColumn>Image</TableHeaderColumn>
          <TableHeaderColumn>Title</TableHeaderColumn>
          <TableHeaderColumn>Page Count</TableHeaderColumn>
          <TableHeaderColumn>Audio</TableHeaderColumn>
          <TableHeaderColumn>E-Book</TableHeaderColumn>
          <TableHeaderColumn>Text</TableHeaderColumn>
        </TableHeader>
        <TableBody>
          {this.props.books.map(function(book){
            return <BookListItem book={book} key={book.key}></BookListItem>;
          })}
        </TableBody>
      </Table>
    </div>;
  }

  
  static get defaultProperties(){
    return {
      books: []	
    }
  }
};

export default BookList;
