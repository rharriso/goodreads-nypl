import ListItem from 'material-ui/List/ListItem';
import React from 'react';
import AppDispatcher from './Dispatchers/AppDispatcher';

class ShelfListItem extends React.Component {
  render(){
    return <ListItem onClick={this.onClick.bind(this)}>{this.props.shelf.title}</ListItem>
  }
  
  onClick(){
    AppDispatcher.handleViewAction({
      actionType: 'CURR_SHELF_CHANGE',
      shelfName: this.props.shelf.title
    });
  }
}

export default ShelfListItem;