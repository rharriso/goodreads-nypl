import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import BookList from './BookList';
import CurrentShelfStore from './Stores/CurrentShelfStore';
import CurrentUserStore from './Stores/CurrentUserStore';
import ShelfList from './ShelfList';
import UserLabel from './UserLabel';


/*
	Root Application
*/
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }


  /**
   * bind to store changes on mount
   * @returns {undefined}
   */
  componentDidMount() {
    CurrentShelfStore.addChangeListener(this._onShelfChange.bind(this));
    CurrentUserStore.addChangeListener(this._onUserChange.bind(this));
  }


  /**
   * unbind to store changes on unmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    CurrentShelfStore.removeChangeListener(this._onShelfChange.bind(this));
    CurrentUserStore.removeChangeListener(this._onUserChange.bind(this));
  }


  /**
   * set the current store state on change
   * @returns {undefined}
   */
  _onShelfChange(){
    this.setState(CurrentShelfStore.get());
  }


  /**
   * set the current user and userid state on change
   * @returns {undefined}
   */
  _onUserChange(){
    const user = CurrentUserStore.get().user;
    const userId = user && user.id;
    this.setState({
      user: user,
      userId: userId
    });
  }

  /**
   * reder the book and shelf lists
   * @param {Number} userId - the userId to show shelfs for
   * @param {Array} books - set of books to display
   * @param {string} sortProp - property to sort the books on
   * @param {string} sortDir - (a|d) what direction to sort the books
   * @returns {React.Component} the book and shelf list
   */
  renderShelfList({userId, books, sortProp, sortDir}){
    return (
        <div className='flex-row'>
          <ShelfList userId={userId}/>
          <BookList
            books={books}
            sortDir={sortDir}
            sortProp={sortProp}/>
        </div>
      );
  }

  /**
   * reder the user selection and maybe the shelf list
   * @returns {React.Component} - the root of the app
   */
  render(){
    return <MuiThemeProvider>
      <div>
        <UserLabel user={this.state.user} />
        { this.state.user && this.renderShelfList(this.state)}
      </div>
		</MuiThemeProvider>;
  }
}


ReactDOM.render(<App/>, document.getElementById('app'));
