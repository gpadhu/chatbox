import React from 'react';
import axios from 'axios';

class NotAllowedChatRoom extends React.Component
{
  addUserToRoom = () => {
    axios.put(`/api/chatroom/${this.props.room._id}`,{
      user: this.props.user.id
    })
    .then(res => {
      this.props.addUserToRoom(this.props.room._id, this.props.user.id);
    })
    .catch( err => {
      console.log('failed to add');
    });
  };
  render() {
    return(
      <div className="welcome">
        <div className="note">
          <h3><span className="name">{this.props.user.name}</span> You are not a member of &nbsp; 
          {this.props.room.name} &nbsp; chatroom. Only members can enter into this chatroom.</h3>
          <div className="row text-center">
            <div className="col-md-12">
              <p className="join" onClick={this.addUserToRoom}>Join this room to start chatting</p>
            </div>  
          </div>
        </div>
      </div>
    );
  };
};

export default NotAllowedChatRoom;