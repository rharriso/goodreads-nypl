import ListItem from 'material-ui/List/ListItem';
import React from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch'; /* global fetch */

import { actions } from './Stores/application-store';

class ShelfListItem extends React.Component {
  onClick(){
    fetch(`/shelf/${this.props.shelf.title}?userId=${this.props.userId}`)
      .then((response) => response.json())
      .then((shelfData) => this.props.dispatch(actions.setShelf(shelfData)));
  }

  render(){
    return <ListItem onClick={this.onClick.bind(this)}>{this.props.shelf.title}</ListItem>;
  }
}

const mapStateToProps = function (state) {
  return {
    userId: state.user && state.user.id
  };
};

export default connect(mapStateToProps)(ShelfListItem);
