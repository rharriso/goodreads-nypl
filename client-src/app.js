import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ShelfList from './ShelfList.js';
import BookList from './BookList.js';
import CurrentShelfStore from './Stores/CurrentShelfStore.js';

console.log(ShelfList);

/*
	Root Application
*/
var App = React.createClass({
	render: function(){
		return <MuiThemeProvider>
      <div>
        <h1>Shelves</h1>
        <ShelfList>
        </ShelfList>
        <BookList books={this.state.books}>
        </BookList>
      </div>
		</MuiThemeProvider>;
	},
	
	componentDidMount: function() {
    CurrentShelfStore.addChangeListener(this._onShelfChange);
  },

  componentWillUnmount: function() {
    CurrentShelfStore.removeChangeListener(this._onShelfChange);
  },
  
  _onShelfChange: function(){
  	this.setState({books: CurrentShelfStore.get().books});
  },

	getInitialState: function(){
		return {
			books: []	
		};
  }
});
	
	
ReactDOM.render(
	<App/>,
	document.getElementById("app")	
);
