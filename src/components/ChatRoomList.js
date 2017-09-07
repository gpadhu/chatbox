import React from 'react';
import ChatRoomItem from './ChatRoomItem';

class ChatRoomList extends React.Component {
  render() {
    return (
      <div className="chatrooms">
        <h2>Chat Rooms</h2>
        <ul className="list-group">
          { Object.keys(this.props.rooms).map(id =>
            <ChatRoomItem key={id} room={this.props.rooms[id]}/>
          )}
        </ul>
      </div>
    );
  };
};

export default ChatRoomList;