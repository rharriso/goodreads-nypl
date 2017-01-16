import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn
} from 'material-ui/Table';

import React from 'react';
import { connect } from 'react-redux';

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
  constructor(){
    super();
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentWillRecieveProps(nextProps) {
    // only load if some change has been made
    this.canLoadNewPage = nextProps.books.length > 0 &&
      (nextProps.books.length !== this.props.books.lenght ||
       nextProps.sortProp !== this.props.sortProp ||
       nextProps.sortProp !== this.props.sortProp);
  }

  handleScroll(){
    console.log(this);
    console.log(this.bookList);
  }

  render(){
    return <div className='book-list' ref={(bookList) => {
      this.bookList = bookList;
      console.log(this, this.bookList);
    }}>
      <Table >
        <TableHeader>
          { HEADER_ITEMS.map((item) =>{
            return <TableHeaderColumn style={item.style}>
              <BookListHeader
                current={this.props.sortProp === item.sortProp}
                label={item.label}/>
            </TableHeaderColumn>;
          })}
       </TableHeader>

        <TableBody>
          {this.props.books &&
            this.props.books.map(function (book){
              return <BookListItem book={book} key={book.key}></BookListItem>;
            })
          }
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

const mapStateToProps = function (state) {
  if (state.shelf){
    const { books = [], sortProp, sortDir} = state.shelf;
    return { books, sortProp, sortDir };
  }

  return {};
};

const ConnectedComponent = connect(mapStateToProps)(BookList);

export default ConnectedComponent;
