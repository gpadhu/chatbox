import React from 'react';

class ChatRoomItem extends React.Component
{
  showRoom = () => {
    console.log(this.props.room.id);
  };
  render() {
    return(
      <li className="list-group-item" onClick={this.showRoom}>{this.props.room.name}</li>
    );
  };
};

export default ChatRoomItem;