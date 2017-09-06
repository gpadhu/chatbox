import React from 'react';
import ChatRoom from './ChatRoom';

class Room extends React.Component {
  render() {
    return (
      <div>
        <ul>
          { this.props.rooms.map(room =>
            <ChatRoom key={room.id} room={room}/>
          )}
        </ul>
      </div>
    );
  };
};

export default Room;