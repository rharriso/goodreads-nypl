import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn
} from 'material-ui/Table';

import React from 'react';
import BookListItem from './BookListItem.jsx';
import BookListHeader from './BookListHeader.jsx';

const HEADER_ITEMS = [
  {label: 'Image', sortProp: 'position'},
  {label: 'Title', sortProp: 'title'},
  {label: 'Page Count', sortProp: 'num_pages'},
  {label: 'Audio'},
  {label: 'E-Book'},
  {label: 'Text'}
];

/*
  Book List
  */
class BookList extends React.Component {
  render(){
    return <div className='book-list'>
      <Table>
        <TableHeader>
          { HEADER_ITEMS.map((item) =>{
            return <TableHeaderColumn>
              <BookListHeader
                current={this.props.sortProp === item.sortProp}
                label={item.label}
                sortDir={this.props.sortDir}
                sortProp={item.sortProp}/>
            </TableHeaderColumn>;
          })}
       </TableHeader>

        <TableBody>
          {this.props.books.map(function (book){
            return <BookListItem book={book} key={book.key}></BookListItem>;
          })}
        </TableBody>
      </Table>
    </div>;
  }


  static get defaultProperties(){
    return {
      books: []
    };
  }
};

export default BookList;
