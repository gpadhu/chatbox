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
    users: [],
    selectedRoom: 'welcome',
    conversations: [],
    currentUser: {}
  };
  componentDidMount() {
    axios.get('/api/chatrooms')
      .then(resp => {
        this.setState({
          rooms: resp.data.chatrooms
        })
      })
      .catch(err => {
        console.log(err);
      });
    axios.get('/api/users')
      .then(resp => {
        this.setState({
          users: resp.data.users
        })
        config.setCurrentUser(Object.keys(this.state.users)[0]);
      })
      .catch(err => {
        console.log(err);
      });    
  };

  getConversation = () => {
    return axios.get(`/api/chatroom/${this.state.selectedRoom.id}/conversations`);
  };

  addToChat = (newMessage) => {
    this.state.conversations[newMessage._id] = newMessage;
    this.forceUpdate();
    let chatDom = document.getElementsByClassName('chats')[0];
    chatDom.scrollTop = chatDom.scrollHeight;
  };

  editChat = (msg, id) => {
    this.state.conversations[id].message = msg;
    this.forceUpdate();
  };

  addUserToRoom = (room, user) => {
    this.state.rooms[room].userIds.push(user);
    this.forceUpdate();
  }
  setDetailComponent =() => {
    if(config.currentRoom == 'welcome') {
      return <Welcome users={this.state.users}/>
    }
    else {
      if(this.isUserAllowedToRoom()) {
        return <ChatRoom room={this.state.selectedRoom} conversations={this.state.conversations}
         user={this.state.currentUser} addToChat={(newMessage)=>this.addToChat(newMessage)}
         editChat={(msg, Id)=> {this.editChat(msg, Id)}} />
      }
      else {
        return <NotAllowedChatRoom room={this.state.selectedRoom} user={this.state.currentUser}
        addUserToRoom={(room, user)=>this.addUserToRoom(room, user)}/>
      }
    }
  };

  isUserAllowedToRoom = () => {
     this.setCurrentRoomAndUser();
     if(this.state.selectedRoom.userIds.includes(this.state.currentUser.id)) {
        return true;
     } else {
        return false;
     } 
  };

  setCurrentRoomAndUser =()=> {
    this.state.selectedRoom = this.state.rooms[config.currentRoom];
    this.state.currentUser = this.state.users[config.currentUser];
  }
  
  reRenderApp = () => {
    if(config.currentRoom != 'welcome'){
      this.setCurrentRoomAndUser();
      this.getConversation().then((response) => {
          this.setState({
            conversations: response.data.conversations
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
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