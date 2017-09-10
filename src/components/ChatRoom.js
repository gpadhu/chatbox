import React from 'react';
import axios from 'axios';
import config from '../../config';

class ChatRoom extends React.Component {
  inputControl; button; deleteBtn;
  state = {
    editing: false,
    editingMsgId: ''
  }
  sendMessage = () => {
    if(!this.state.editing) {
      this.postMessage()
      .then((response)=> {
      this.props.addToChat(response.data.newMessage);
      this.inputControl.value = "";
    });
    } else {
      this.updateMessage()
      .then((response)=> {
      this.props.editChat(this.inputControl.value, this.state.editingMsgId);
      this.inputControl.value = "";
      this.state.editing = false;
    });
    }
  };

  componentDidMount() {
    let chatDom = document.getElementsByClassName('chats')[0];
    chatDom.scrollTop = chatDom.scrollHeight;
  };

  postMessage = () => {
   return axios.post('/api/conversations', {
      "message": this.inputControl.value,
      "chatroom": this.props.room.id,
      "user": this.props.user.id,
      "name": this.props.user.name,
      "timestamp": new Date()
    });
  };

  updateMessage = () => {
    return axios.put(`/api/conversation/${this.state.editingMsgId}`, {
      "message": this.inputControl.value,
      "chatroom": this.props.room.id,
      "user": this.props.user.id,
      "name": this.props.user.name,
      "timestamp": new Date()
    });
  };

  deleteMsg = () => {
    return axios.delete(`/api/conversation/${this.state.editingMsgId}`)
      .then((res) => {
        this.props.deleteMsg(this.state.editingMsgId);
        this.resetUpdate();
      });
  };

  unSubsribeUserFromRoom = () => {
    axios.put(`/api/chatroom/${this.props.room._id}/${this.props.user.id}`)
    .then(res => {
      this.props.removeUserFromRoom(this.props.room._id, this.props.user.id);
    })
    .catch( err => {
      console.log('failed to remove');
    });
  };
  
  editMessage = (message) => {
    if(message.user == this.props.user.id) {
      this.state.editing = true;
      this.state.editingMsgId = message._id
      this.inputControl.value = message.message;
      this.button.innerHTML = "Edit";
      this.deleteBtn.style.visibility = 'visible';
    } else {
      this.resetUpdate();
    }
  };

  resetUpdate = () => {
    this.state.editing = false;
    this.state.editingMsgId = '';
    this.button.innerHTML = "Send";
    this.inputControl.value = "";
    this.deleteBtn.style.visibility = 'hidden';
  };

  updateBtn = () => {
    if(this.state.editing && this.inputControl.value == "") {
      this.resetUpdate();
    }
  };
  classNames = (id) => {
    if (this.props.conversations[id].user == this.props.user.id) {
      return 'list-group-item conversation'
    } else {
      return 'list-group-item conversation unauthorised'
    }
  };

  
  render() {
    return(
      <div className="welcome">
        <div className="conversations">
          <h3>Welcome to {this.props.room.name} Chat! <span className="unsubscribe" onClick={this.unSubsribeUserFromRoom}>Leave this room</span></h3>
          <ul className="list-group chats">
            { Object.keys(this.props.conversations).map(id => 
               <li key={id} className={this.classNames(id)} onClick={()=>this.editMessage(this.props.conversations[id])}>
                 {this.props.conversations[id].message}
                 <span className="sender">&nbsp; - By {this.props.conversations[id].name} 
                 &nbsp; at &nbsp; {(new Date(this.props.conversations[id].timestamp)).toUTCString()} </span></li>
              )
            }
          </ul>
          <div className="message">
            <div className="form-inline">
              <div className="form-group">
                <div className="row">
                  <div className="col-md-8">
                    <input ref={(input)=> {this.inputControl = input}} onChange={this.updateBtn} type="text" className="form-control" id="email"/>
                  </div>
                  <div className="col-md-2">
                    <button ref={(button)=> {this.button = button}} type="submit" className="btn btn-block btn-primary" onClick={this.sendMessage}>Send</button>
                  </div>
                  <div className="col-md-2">
                    <button ref={(deleteBtn)=> {this.deleteBtn = deleteBtn}} className="delete-btn btn btn-block btn-danger" onClick={this.deleteMsg}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
export default ChatRoom;