import React from 'react';
import AppDispatcher from './Dispatchers/AppDispatcher';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const wrapperStyle = {
  display: 'flex',
  'justify-content': 'center'
};

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
        <div style={wrapperStyle}>
          <div>
            <TextField
              placeholder='username'
              value={this.state.username}
              onEnterKeyDown={this.onSubmit.bind(this)}
              onChange={this.handleChange.bind(this)} />
            <RaisedButton
              type='submit'
              onClick={this.onSubmit.bind(this)}
              label="Find User" primary={true}/>
          </div>
        </div>
      );
    }
  }
}

export default UserLabel;
