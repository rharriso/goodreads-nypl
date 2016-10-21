import List from 'material-ui/List/List';
import React from 'react';
import reqwest from 'reqwest';
import ShelfListItem from './ShefListItem.jsx';

/*
  Shelf List
*/
class ShelfList extends React.Component {
  constructor(params){
    super(params);
    this.state = {
      shelves: []
    };
  }

  render(){
    return <List className='shelf-list'>
      {this.state.shelves.map(function(shelf){
        return <ShelfListItem shelf={shelf} key={shelf.key}></ShelfListItem>;
      })}
    </List>;
  }
  
  componentDidMount(){
    reqwest({
      url: '/shelves',
      type: 'json',
      success: function(data){
        this.setState({shelves: data});
      }.bind(this)
    });
  }
}

export default ShelfList;
