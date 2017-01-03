import List from 'material-ui/List/List';
import React from 'react';
import 'whatwg-fetch'; /* global fetch*/
import ShelfListItem from './ShelfListItem.jsx';

/*
  Shelf List
*/
class ShelfList extends React.Component {

  /**
   * Initialize the state of the component.
   * @param {Object} props - properties passsed to component
   * @returns {undefined}
   */
  constructor(props){
    super(props);
    this.state = {
      shelves: []
    };
  }


  /**
   * Load shelves for the passed user id
   * @param {Integer} userId the id of the user to load
   * @returns {undefined}
   */
  loadShelvesForUserId(userId){
    if (userId) {
      fetch(`/shelves/${userId}`)
        .then((response) => response.json())
        .then((shelves) => this.setState({shelves: shelves}));
    }
  }


  /**
   * Load shelves on mound
   * @returns {undefined}
   */
  componentWillMount(){
    this.loadShelvesForUserId(this.props.userId);
  }


  /**
   * try to load the shelves on prop change
   * @param {Object} newProps the new properties being passed
   * @returns {undefined}
   */
  componentWillReceiveProps(newProps){
    if (newProps.userId) {
      this.loadShelvesForUserId(newProps.userId);
    } else {
      this.setState({shelves: []});
    }
  }


  /**
   * renders the jsx element
   * @returns {ReactElement} - element of list
   */
  render(){
    return <List className='shelf-list'>
      {this.state.shelves.map(function (shelf){
        return <ShelfListItem shelf={shelf} key={shelf.key}></ShelfListItem>;
      })}
    </List>;
  }
}

export default ShelfList;
