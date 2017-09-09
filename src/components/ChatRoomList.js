import React from 'react';
import ChatRoomItem from './ChatRoomItem';
import config from '../../config';

class ChatRoomList extends React.Component {
  activeClass = (id) => {
    return 'list-group-item' + (this.props.rooms[id]._id === config.currentRoom ? ' active' : '')
  };
  setChatRoom = (id) => {
    config.setCurrentRoom(id);
    this.forceUpdate();
    this.props.reRenderApp();
  };
  render() {
    return (
      <div className="chatrooms">
        <h2>Chat Rooms</h2>
        <ul className="list-group">
          <li className="list-group-item choose" onClick={()=>this.setChatRoom('welcome')}>Choose User</li>
          { Object.keys(this.props.rooms).map(id =>
            <ChatRoomItem key={id} room={this.props.rooms[id]} setChatRoom={()=>this.setChatRoom(id)} active={this.activeClass(id)}/>
          )}
        </ul>
      </div>
    );
  };
};

export default ChatRoomList;