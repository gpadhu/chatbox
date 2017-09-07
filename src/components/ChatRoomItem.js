import React from 'react';
import config from '../../config';

class ChatRoomItem extends React.Component {
  setChatRoom = () => {
    config.setCurrentRoom(this.props.room._id);
    this.props.askAppToRender();
  };
  render() {
    return(
      <li className={this.props.active} onClick={this.setChatRoom}>{this.props.room.name}</li>
    );
  };
};

export default ChatRoomItem;