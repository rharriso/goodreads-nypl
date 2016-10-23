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
  constructor (props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    CurrentShelfStore.addChangeListener(this._onShelfChange.bind(this));
  }

  componentWillUnmount() {
    CurrentShelfStore.removeChangeListener(this._onShelfChange.bind(this));
  }
  
  _onShelfChange(){
    this.setState(CurrentShelfStore.get());
  }

  render (){
    return <MuiThemeProvider>
      <div>
        <div className='flex-row'>
          <ShelfList />
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
