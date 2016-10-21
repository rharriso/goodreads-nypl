import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ShelfList from './ShelfList.jsx';
import BookList from './BookList.jsx';
import CurrentShelfStore from './Stores/CurrentShelfStore';

/*
	Root Application
*/
class App extends React.Component {
  render (){
    return <MuiThemeProvider>
      <div>
        <h1>Shelves</h1>
        <ShelfList>
        </ShelfList>
        <BookList books={this.state.books}>
        </BookList>
      </div>
		</MuiThemeProvider>;
  }
	
  componentDidMount() {
    CurrentShelfStore.addChangeListener(this._onShelfChange);
  }

  componentWillUnmount() {
    CurrentShelfStore.removeChangeListener(this._onShelfChange);
  }
  
  _onShelfChange(){
    this.setState({books: CurrentShelfStore.get().books});
  }

  getInitialState(){
    return {
      books: []	
    };
  }
}
	
	
ReactDOM.render(<App/>, document.getElementById('app'));
