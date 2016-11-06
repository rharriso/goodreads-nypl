import React from 'react';
import AppDispatcher from './Dispatchers/AppDispatcher';

/**
 * SearchBar
 */
class SearchBar extends React.Component {
  /**
   *
   * set stat on construction
   * @param {Object} props - properties passed to component
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {};
  }


  /**
   * Respond to submit event by triggering SearchBar
   * @param {Event} e submit event
   * @returns {undefined}
   */
  onSubmit(e){
    e.preventDefault();
    AppDispatcher.handleViewAction({
      actionType: 'BOOK_SEARCH',
      q: this.state.q
    });
  }


  /**
   * respond to event change
   * @param {Event} e submit event
   * @returns {undefined}
   */
  handleChange(e){
    this.setState({q: e.target.value});
  }


  /**
   * render the search bookArr
   * @returns {Object} react compoenent
   */
  render(){
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input placeholder='Search for Book' value={this.state.q} onChange={this.handleChange.bind(this)} />
        <input type="submit" value="search" />
      </form>
    );
  }
}

export default SearchBar;
