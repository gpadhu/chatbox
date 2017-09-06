import React from 'react';

class ChatRoom extends React.Component
{
  showRoom = () => {
    console.log(this.props.room.id);
  };
  render() {
    return(
      <li onClick={this.showRoom}>{this.props.room.name}</li>
    );
  };
};

export default ChatRoom;