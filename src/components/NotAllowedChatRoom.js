import React from 'react';
class NotAllowedChatRoom extends React.Component
{
  render() {
    return(
      <div className="welcome">
        <div className="note">
          <h3>You are not a member of this chatroom. Only members can enter into this chatroom.</h3>
        </div>
      </div>
    );
  };
};