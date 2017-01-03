import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import BookList from './BookList';
import CurrentShelfStore from './Stores/CurrentShelfStore';
import SearchStore from './Stores/SearchStore';
import SearchBar from './SearchBar';
import ShelfList from './ShelfList';
import UserLabel from './UserLabel';

import store from './Stores/application-store';


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
    SearchStore.addChangeListener(this._onSearchChange.bind(this));
  }


  /**
  * unbind to store changes on unmount
  * @returns {undefined}
  */
  componentWillUnmount() {
    CurrentShelfStore.removeChangeListener(this._onShelfChange.bind(this));
    SearchStore.removeChangeListener(this._onSearchChange.bind(this));
  }


  /**
  * set the current store state on change
  * @returns {undefined}
  */
  _onShelfChange(){
    this.setState(CurrentShelfStore.get());
  }


  /**
  * set the current search state on change
  * @returns {undefined}
  */
  _onSearchChange(){
    this.setState(SearchStore.get());
  }


  /**
  * reder the user selection and maybe the shelf list
  * @returns {React.Component} - the root of the app
  */
  render(){
    return <MuiThemeProvider>
      <div>
        <UserLabel user={this.props.user} />
        <div>
          { !!this.props.user && (
            <SearchBar/>,
            <div className='flex-row'>
              <ShelfList userId={this.props.userId}/>
              <BookList books={ this.props.books } />
            </div>
          )}
        </div>
      </div>
    </MuiThemeProvider>;
  }
}


const mapStateToProps = function (state) {
  return {
    shelf: state.shelf,
    book: state.shelf && state.shelf.books,
    user: state.user,
    userId: state.user && state.user.id
  };
};


const ConnectedAp = connect(mapStateToProps)(App);


ReactDOM.render(
  <Provider store={store}><ConnectedAp/></Provider>,
    document.getElementById('app')
  );
