import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux'
import 'whatwg-fetch'; /* global fetch */

import { actions } from './Stores/application-store';

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
	  fetch(`/showUser/${this.state.username}`)
	  	.then((response) => response.json())
    	.then((user) => {
    		this.props.dispatch(actions.setUser(user));
    	});
  }

  onUnsetClick(){
    this.props.dispatch(actions.setUser(undefined));
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


/**
 *
 */
const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect (mapStateToProps)(UserLabel);
