import React from 'react';
import AppDispatcher from './Dispatchers/AppDispatcher';

/**
 * UserLabel
 */
class UserLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }		
	
	onSubmit(){
		alert("HEYO: " + this.state.username);
	}
	
	handleChange(e){
		console.log(this.state.username);
		this.setState({username: e.target.value})
	}
	
  render(){
		if (this.props.user) {
				
		} else {
			return (
				<form onSubmit={this.onSubmit.bind(this)}>
					<input placeholder='username' value={this.state.username} onChange={this.handleChange.bind(this)} />
					<input type="submit" value="find user" />
				</form>
			);
		}
  }
}

export default UserLabel;
