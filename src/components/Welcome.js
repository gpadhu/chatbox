import React from 'react';
import User from './User';
import config from '../../config';

class Welcome extends React.Component {
  activeClass = (id) => {
    return 'list-group-item' + (this.props.users[id].id === config.currentUser ? ' active' : '')
  };
  reRender = () => {
    this.forceUpdate();
  }
  render() {
    return(
      <div className="welcome">
        <div className="note">
          <h1>Welcome to ChatBox!</h1>
          <h3>Please choose a chat room to chat with your friens.</h3>
          <p className="list-title">Choose User:</p>
          <ul className="list-group">
            { Object.keys(this.props.users).map(id =>
                <User key={id} user={this.props.users[id]} active={this.activeClass(id)} reRender={this.reRender}/>
            )}
          </ul>
        </div>
      </div>
    );
  };
};

export default Welcome