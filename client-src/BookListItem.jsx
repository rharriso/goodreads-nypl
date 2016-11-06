import AppDispatcher from './Dispatchers/AppDispatcher';

import React from 'react';

import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import {TableRow, TableRowColumn} from 'material-ui/Table';


const AUDIO_BOOK_CODE = 'n';
const E_BOOK_CODE = 'z';
const TEXT_CODE = 'a';

class BookListItem extends React.Component {

  _searchCriterion(formatCode){
    if (!formatCode) {
      throw new Error('formatCode required');
    }

    var lintTitle = this.props.book.title.replace(/\(.*\)/igm, '');

    return `a:(${this.props.book.author}) ` +
           `t:(${lintTitle}) ` +
           `f:${formatCode} `;
  }


  render(){
    return <TableRow>
      <TableRowColumn>
          <Avatar src={this.props.book.imageUrl} />
      </TableRowColumn>

      <TableRowColumn>{this.props.book.title}</TableRowColumn>
      <TableRowColumn>{this.props.book.numPages}</TableRowColumn>

    <TableRowColumn>
        <FlatButton
          label="Goodreads"
          href={`https://www.goodreads.com/book/show/${this.props.book.id}`}
        />
      </TableRowColumn>


      <TableRowColumn>
        <FlatButton
          label="audiobook"
          href={
            'http://browse.nypl.org/iii/encore/search/C__S' +
            this._searchCriterion(AUDIO_BOOK_CODE) +
            '__Orightresult__U?lang=eng&suite=def'
          }
        />
      </TableRowColumn>

      <TableRowColumn>
        <FlatButton
          label="e-book"
          href={
            'http://browse.nypl.org/iii/encore/search/C__S' +
            this._searchCriterion(E_BOOK_CODE) +
            '__Orightresult__U?lang=eng&suite=def'
          }
        />
      </TableRowColumn>

      <TableRowColumn>
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
