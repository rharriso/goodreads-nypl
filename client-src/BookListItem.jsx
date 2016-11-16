import AppDispatcher from './Dispatchers/AppDispatcher';

import React from 'react';

import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import {TableRow, TableRowColumn} from 'material-ui/Table';


const AUDIO_BOOK_CODE = 'n';
const E_BOOK_CODE = 'z';
const TEXT_CODE = 'a';
const SMALL_COL_STYLE = {width: 80, paddingLeft: 10, paddingRight: 10};

/**
 * BookListItem item in the book list
 */
class BookListItem extends React.Component {

  /**
   * construct search triterion based on the passed code
   * @param {String} formatCode defined by NYPL (find in advanced search page)
   * @returns {String} search url for format
   */
  _searchCriterion(formatCode){
    if (!formatCode) {
      throw new Error('formatCode required');
    }

    var lintTitle = this.props.book.title.replace(/\(.*\)/igm, '');

    return `a:(${this.props.book.author}) ` +
           `t:(${lintTitle}) ` +
           `f:${formatCode} `;
  }


  /**
   * render the compoenent
   * @returns {Object} react component
   */
  render(){
    return <TableRow>
      <TableRowColumn style={SMALL_COL_STYLE}>
          <Avatar src={this.props.book.imageUrl} />
      </TableRowColumn>

      <TableRowColumn>{this.props.book.title}</TableRowColumn>
      <TableRowColumn>{this.props.book.author}</TableRowColumn>
      <TableRowColumn style={SMALL_COL_STYLE}>{this.props.book.numPages}</TableRowColumn>

    <TableRowColumn style={SMALL_COL_STYLE}>
        <FlatButton
          label="GR"
          href={`https://www.goodreads.com/book/show/${this.props.book.id}`}
        />
      </TableRowColumn>


      <TableRowColumn style={SMALL_COL_STYLE}>
        <FlatButton
          label="AUDIO"
          href={
            'http://browse.nypl.org/iii/encore/search/C__S' +
            this._searchCriterion(AUDIO_BOOK_CODE) +
            '__Orightresult__U?lang=eng&suite=def'
          }
        />
      </TableRowColumn>

      <TableRowColumn style={SMALL_COL_STYLE}>
        <FlatButton
          label="ebook"
          href={
            'http://browse.nypl.org/iii/encore/search/C__S' +
            this._searchCriterion(E_BOOK_CODE) +
            '__Orightresult__U?lang=eng&suite=def'
          }
        />
      </TableRowColumn>

      <TableRowColumn style={SMALL_COL_STYLE}>
        <FlatButton
          label="text"
          href={
            'http://browse.nypl.org/iii/encore/search/C__S' +
            this._searchCriterion(TEXT_CODE) +
            '__Orightresult__U?lang=eng&suite=def'
          }
        />
      </TableRowColumn>
    </TableRow>;
  }
}

export default BookListItem;
