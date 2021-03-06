import AppDispatcher from './Dispatchers/AppDispatcher';

import React from 'react';

import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import {TableRow, TableRowColumn} from 'material-ui/Table';


const AUDIO_BOOK_CODE = 'n';
const E_BOOK_CODE = 'z';
const TEXT_CODE = 'a';
const SMALL_COL_STYLE = {width: 80, paddingLeft: 5, paddingRight: 5};
const IMG_COL_STYLE = {width: 100, paddingLeft: 5, paddingRight: 5};
const WIDE_FIXED_COL_STYLE = {width: 150, paddingLeft: 5, paddingRight: 0};

/**
 * produce the author queyr string
 *
 * @param {string} authorName
 */
function authorCriterion(authorName) {
  return `a:(${authorName})`;
}

/**
 * construct search triterion based on the passed code
 * @param {String} bookTitle - the title of the book
 * @returns {String} search url for format
 */
function titleCriterion(bookTitle){
  const lintTitle = bookTitle.replace(/\(.*\)/igm, '')
                             .split(":")[0];
  return `t:(${lintTitle})`;
}

/**
 * construct a format link
 * @params {string} bookTitle - the title of the book
 * @params {string} formatCode - format code
 * @returns {string} search url
 */
function formatCriterion(bookTitle, formatCode) {
  return titleCriterion(bookTitle) + ` f:${formatCode}`;
}

/**
 * create library link
 *
 * @param {string} searchQuery
 */
function libraryLink(searchQuery) {
  return `http://browse.nypl.org/iii/encore/search/C__S${searchQuery}__Orightresult__U?lang=eng&suite=def`
}


/**
 * BookListItem item in the book list
 */
class BookListItem extends React.Component {
  /**
   * render the compoenent
   * @returns {Object} react component
   */
  render(){
    const {
      title: bookTitle,
      id: bookId,
      numPages,
      imageUrl: bookImageUrl,
      author
    } = this.props.book;

    return (
      <TableRow>
        <TableRowColumn style={IMG_COL_STYLE}>
            <Avatar src={bookImageUrl} size={100} />
        </TableRowColumn>

        <TableRowColumn>
          <FlatButton
            className="book-list-item-title"
            label={bookTitle}
            href={libraryLink(titleCriterion(bookTitle))} />
          </TableRowColumn>
        <TableRowColumn style={WIDE_FIXED_COL_STYLE}>
          <FlatButton
            className="book-list-item-author"
            label={author}
            href={libraryLink(authorCriterion(author))} />
          </TableRowColumn>
        <TableRowColumn style={SMALL_COL_STYLE}>{numPages}</TableRowColumn>

        <TableRowColumn style={SMALL_COL_STYLE}>
          <FlatButton
            label="GR"
            href={`https://www.goodreads.com/book/show/${bookId}`}
          />
        </TableRowColumn>

        <TableRowColumn style={SMALL_COL_STYLE}>
          <FlatButton
            label="Audio"
            href={libraryLink(formatCriterion(bookTitle, AUDIO_BOOK_CODE))}
          />
        </TableRowColumn>
      </TableRow>
    );
  }
}

export default BookListItem;
