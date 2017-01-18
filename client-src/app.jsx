import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import BookList from './BookList';
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
  * reder the user selection and maybe the shelf list
  * @returns {React.Component} - the root of the app
  */
  render(){
    return <MuiThemeProvider>
      <div>
        <UserLabel user={this.props.user} />
        <div>
          { !!this.props.user && (
            <div className='flex-collumn'>
              <div className='flex-row'>
                <SearchBar/>
              </div>
              <div className='flex-row'>
                <ShelfList userId={this.props.userId}/>
                <BookList />
              </div>
            </div>
          )}
        </div>
      </div>
    </MuiThemeProvider>;
  }
}


const mapStateToProps = function (state) {
  return {
    user: state.user,
    userId: state.user && state.user.id
  };
};


const ConnectedAp = connect(mapStateToProps)(App);


ReactDOM.render(
  <Provider store={store}><ConnectedAp/></Provider>,
    document.getElementById('app')
  );
