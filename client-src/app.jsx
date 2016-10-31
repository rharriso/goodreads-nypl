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

  componentDidMount() {
    CurrentShelfStore.addChangeListener(this._onShelfChange.bind(this));
    CurrentUserStore.addChangeListener(this._onUserChange.bind(this));
  }

  componentWillUnmount() {
    CurrentShelfStore.removeChangeListener(this._onShelfChange.bind(this));
    CurrentUserStore.removeChangeListener(this._onUserChange.bind(this));
  }

  _onShelfChange(){
    this.setState(CurrentShelfStore.get());
  }

  _onUserChange(){
    const user = CurrentUserStore.get().user;
    const userId = user && user.id;
    this.setState({
      user: user,
      userId: userId
    });
  }

  render(){
    return <MuiThemeProvider>
      <div>
        <UserLabel user={this.state.user} />
        <div className='flex-row'>
          <ShelfList userId={this.state.userId}/>
          <BookList
            books={this.state.books}
            sortDir={this.state.sortDir}
            sortProp={this.state.sortProp}/>
        </div>
      </div>
		</MuiThemeProvider>;
  }
}


ReactDOM.render(<App/>, document.getElementById('app'));
