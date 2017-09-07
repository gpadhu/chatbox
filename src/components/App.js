import React from 'react';
import ChatRoomList from './ChatRoomList';
import Welcome from './Welcome';
import NotAllowedChatRoom from './NotAllowedChatRoom';
import ChatRoom from './ChatRoom';
import axios from 'axios';
import config from '../../config';

class App extends React.Component {
  state = {
    rooms: [],
    users: []
  };
  componentDidMount() {
    axios.get('/api/chatrooms')
      .then(resp => {
        console.log(resp);
        this.setState({
          rooms: resp.data.chatrooms
        })
      })
      .catch(err => {
        console.log(err);
      });
    axios.get('/api/users')
      .then(resp => {
        console.log(resp);
        this.setState({
          users: resp.data.users
        })
      })
      .catch(err => {
        console.log(err);
      });
  };
  setDetailComponent =() => {
    if(config.currentRoom == 'welcome') {
      return <Welcome users={this.state.users}/>
    } else {
      if(this.isUserAllowedToRoom()) {
        return <ChatRoom />
      } else {
        return <NotAllowedChatRoom />
      }
    }
  };
  isUserAllowedToRoom = () => {
     let selectedRoom = this.state.rooms[config.currentRoom];
     if(selectedRoom.userIds.includes(config.currentUser)) {
       
        return true;
     } else {
        return false;
     } 
  };
  reRenderApp = () => {
    console.log('called.....')
    this.forceUpdate();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <ChatRoomList rooms={this.state.rooms} reRenderApp={this.reRenderApp}/>
          </div>
          <div className="col-md-9">
            {this.setDetailComponent()}
          </div>
        </div>
      </div>
    );
  }
};

export default App;