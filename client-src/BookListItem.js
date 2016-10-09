import AppDispatcher from './Dispatchers/AppDispatcher';

import React from 'react';

import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import ListItem from 'material-ui/List/ListItem';

const AUDIO_BOOK_CODE = 'n';
const E_BOOK_CODE = 'z';
const TEXT_CODE = 'a';

var BookListItem = React.createClass({

  _searchCriterion: function(formatCode){
    if (!formatCode) {
      throw new Error("formatCode required");
    }

    var lintTitle = this.props.book.title.replace(/\(.*\)/igm, "");
    
    return `a:(${this.props.book.author}) ` +
           `t:(${lintTitle}) ` +
           `f:${formatCode} `;
  },
   

	render: function(){
		return <ListItem
        leftAvatar={
          <Avatar src={this.props.book.imageUrl} />
        }
      >{this.props.book.title}
      
      <FlatButton
        label="audiobook" 
        href={
          'http://browse.nypl.org/iii/encore/search/C__S' +
          this._searchCriterion(AUDIO_BOOK_CODE) +
          '__Orightresult__U?lang=eng&suite=def'
        }
      />
      
      <FlatButton
        label="e-book" 
        href={
          'http://browse.nypl.org/iii/encore/search/C__S' +
          this._searchCriterion(E_BOOK_CODE) +
          '__Orightresult__U?lang=eng&suite=def'
        }
      />
      
      <FlatButton
        label="text" 
        href={
          'http://browse.nypl.org/iii/encore/search/C__S' +
          this._searchCriterion(TEXT_CODE) +
          '__Orightresult__U?lang=eng&suite=def'
        }
      />
    </ListItem>
	},
});

export default BookListItem;
