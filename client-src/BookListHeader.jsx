/*
 * BookListHeader.jsx
 * Copyright (C) 2016 rharriso <rharriso@cub3>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react';
import AppDispatcher from './Dispatchers/AppDispatcher';

const SORTABLE_PROPS = ['num_pages'];

class BookListHeader extends Component {
  /**
   * 
   */ 
  constructor(props) {
    super(props);

    this.state = {
      current: false,
      state: undefined // state can be 
    };
  }


  /**
   * 
   */
  render() {
    let content = this.props.label;

    if (this.props.sortProp) {
      content = (
        <a title='{this.props.sortProp}' onClick={this.onClick.bind(this)}>
          {content}
        </a>
      );
    }     
    return <div>{content}</div>;
  }

  /**
   *
   */
  onClick(){
    AppDispatcher.handleViewAction({
      actionType: 'SHELF_SORT_CHANGE',
      sortProp: this.props.sortProp,
      sortDir: this.props.sortDir === 'a' ? 'd' : 'a'
    });
  }

  static get defaultProps(){
    return {
      sortDir: '', 
      current: false      
    };
  }
}


const internals = {};

/**
 * 
 */
internals.validSortProp = (props, propName)=> {
  let sortProp = props[propName];

  if (sortProp && SORTABLE_PROPS.indexOf(sortProp) < 0) {
    return new Error('invalid sortProp value: ' + sortProp);
  }
};

/**
 * 
 */
BookListHeader.propTypes = {
  current: React.PropTypes.bool,
  label: React.PropTypes.string,
  sortDir: internals.validSortProp,
  sortProps: internals.validSortProp
};


export default BookListHeader;
