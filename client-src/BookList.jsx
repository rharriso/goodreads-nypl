import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn
} from 'material-ui/Table';

import React from 'react';
import BookListItem from './BookListItem.jsx';
import BookListHeader from './BookListHeader.jsx';

const SMALL_COL_STYLE = {width: 80, paddingLeft: 10, paddingRight: 10};

const HEADER_ITEMS = [
  {label: 'Image', sortProp: 'position', style: SMALL_COL_STYLE},
  {label: 'Title', sortProp: 'title'},
  {label: 'Author', sortProp: 'author'},
  {label: 'Page Count', sortProp: 'num_pages', style: SMALL_COL_STYLE},
  {label: 'Goodreads', style: SMALL_COL_STYLE},
  {label: 'Audio', style: SMALL_COL_STYLE},
  {label: 'E-Book', style: SMALL_COL_STYLE},
  {label: 'Text', style: SMALL_COL_STYLE}
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
            return <TableHeaderColumn style={item.style}>
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
