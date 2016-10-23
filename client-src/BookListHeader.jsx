/*
 * BookListHeader.jsx
 * Copyright (C) 2016 rharriso <rharriso@cub3>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react';

const SORTABLE_PROPS = ['num_pages'];

class BookListHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: false,
      state: undefined // state can be 
    };
  }

  render() {
    return (
      <div>{this.props.label}</div>
    );
  }
}

const internals = {};

internals.validSortProp = (props, propName)=> {
  let sortProp = props[propName];

  if (sortProp && SORTABLE_PROPS.indexOf(sortProp) < 0) {
    return new Error('invalid sortProp value: ' + sortProp);
  }
};

BookListHeader.propTypes = {
  label: React.PropTypes.string,
  sortProps: internals.validSortProp
};


export default BookListHeader;
