/*
 * BookListHeader.jsx
 * Copyright (C) 2016 rharriso <rharriso@cub3>
 *
 * Distributed under terms of the MIT license.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from './Stores/application-store';

const SORTABLE_PROPS = ['num_pages'];

/**
 * Book list header item
 */
class BookListHeader extends Component {
  /**
   * set state on construction
   * @param {Object} props - props passed to component
   * @return {undefined}
   */
  constructor(props) {
    super(props);

    this.state = {
      current: false,
      state: undefined // state can be
    };
  }


  /**
   * render component
   * @return {Object} React component
   */
  render() {
    let content = this.props.label;
    let linkClasses = 'book-list-header';

    if (this.props.current) {
      linkClasses += ' ' + this.props.sortDir;
    }

    if (this.props.sortProp) {
      content = (
        <a className={linkClasses}
          title={this.props.sortProp}
          onClick={this.onClick.bind(this)}>
          {content}
        </a>
      );
    }

    return <div>{content}</div>;
  }


  /**
   * sort by item when clicked
   * @return {undefined}
   */
  onClick(){
    console.log(this.props.sortProp);
    actions.setShelfSort(
      this.props.sortProp,
      this.props.sortDir === 'a' ? 'd' : 'a'
    );
  }

  /**
   * set the default props
   * @return {Object} the initial props
   */
  static get defaultProps(){
    return {
      sortDir: '',
      current: false
    };
  }
}


const internals = {};

/**
 * set the default props
 * @param {Object} props - set of properties
 * @param {String} propName - prop to check
 * @return {undefined}
 */
internals.validSortProp = (props, propName)=> {
  const sortProp = props[propName];

  if (sortProp && SORTABLE_PROPS.indexOf(sortProp) < 0) {
    return new Error('invalid sortProp value: ' + sortProp);
  }
};

/**
 * @prop {Boolean} current - is this the current sort
 * @prop {String} label - property to be sorted by
 * @prop {String} sortDir - the direction to sort by
 * @return {undefined}
 */
BookListHeader.propTypes = {
  current: React.PropTypes.bool,
  label: React.PropTypes.string,
  sortDir: internals.validSortProp
};

const mapStateToProps = function (state) {
  console.log(state);
  if (state.shelf){
    const { sortProp, sortDir} = state.shelf;

    if (sortProp === this.props.sortProp) {
      return {
        sortDir,
        current: true
      };
    }
    return {};
  }
};

const ConnectedComponent = connect(mapStateToProps)(BookListHeader);

export default ConnectedComponent;
