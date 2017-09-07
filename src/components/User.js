import React from 'react';
import config from '../../config';

class User extends React.Component {
  setCurrentUser = () => { 
    config.setCurrentUser(this.props.user.id);
    console.log(config.currentUser);
    this.props.reRender.call();

  };
  shouldComponentUpdate = () => {
    return true;
  };
  render() {
    return(
    <li className={this.props.active} onClick={this.setCurrentUser}>{this.props.user.name}</li>
    )
  }
}
export default User;