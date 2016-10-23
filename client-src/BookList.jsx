import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn
} from 'material-ui/Table';

import React from 'react';
import BookListItem from './BookListItem.jsx';
import BookListHeader from './BookListHeader.jsx';

/*
  Book List
  */
class BookList extends React.Component {
  render (){
    return <div className='book-list'>
      <Table>
        <TableHeader>
          <TableHeaderColumn>
            <BookListHeader label='Image'/>
          </TableHeaderColumn>
          <TableHeaderColumn>
            <BookListHeader label='Title'/>
          </TableHeaderColumn>
          <TableHeaderColumn>
            <BookListHeader label='Page Count' sortProp='num_pages'/>
          </TableHeaderColumn>
          <TableHeaderColumn>
            <BookListHeader label='Audio'/>
          </TableHeaderColumn>
          <TableHeaderColumn>
            <BookListHeader label='E-Book'/>
          </TableHeaderColumn>
          <TableHeaderColumn>
            <BookListHeader label='Text'/>
          </TableHeaderColumn>
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
