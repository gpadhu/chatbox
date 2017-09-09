import React from 'react';
import config from '../../config';

class User extends React.Component {
  setCurrentUser = () => { 
    config.setCurrentUser(this.props.user._id);
    this.props.reRender.call();
  }
  render() {
    return(
    <li className={this.props.active} onClick={this.setCurrentUser}>{this.props.user.name}</li>
    )
  }
}
export default User;