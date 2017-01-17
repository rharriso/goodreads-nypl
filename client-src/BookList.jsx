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
import { actions } from './Stores/application-store';

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

const SCROLL_THRESHOLD = 1000;

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

  /**
   * allow new pages to be loaded
   */
  componentWillReceiveProps() {
    this.canLoadNewPage = true;
    this.handleScroll();
  }

  /**
   * load next page if scroll is close
   */
  handleScroll(){
    const scrollTop = document.body.scrollTop;
    const scrollBottomPos = scrollTop +
                            window.innerHeight;
    const bookBottom = this.bookList.offsetTop +
                        this.bookList.clientHeight;

    if (Math.abs(bookBottom - scrollBottomPos) < SCROLL_THRESHOLD && this.canLoadNewPage) {
      this.canLoadNewPage = false;
      actions.loadNextShelfPage();
    }
  }

  render(){
    return <div className='book-list' ref={(bookList) => {
      this.bookList = bookList;
    }}>
      <Table >
        <TableHeader>
          { HEADER_ITEMS.map((item) =>{
            return <TableHeaderColumn style={item.style}>
              <BookListHeader
                sortProp={item.sortProp}
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
