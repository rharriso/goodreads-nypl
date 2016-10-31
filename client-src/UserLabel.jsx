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

  onSubmit(e){
    e.preventDefault();
    AppDispatcher.handleViewAction({
      actionType: 'CURR_USERNAME_SET',
      username: this.state.username
    });
  }

  onUnsetClick(e){
    e.preventDefault();
    AppDispatcher.handleViewAction({
      actionType: 'CURR_USER_UNSET',
      username: this.state.username
    });
  }

  handleChange(e){
    this.setState({username: e.target.value});
  }

  render(){
    if (this.props.user) {
      return (
          <div>
            <span>{this.props.user.name}</span>
            &nbsp;|&nbsp;
            <a href="#" onClick={this.onUnsetClick.bind(this)}>Not You?</a>
          </div>
      );
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
