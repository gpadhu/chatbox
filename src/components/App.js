import React from 'react';
import ChatRoomList from './ChatRoomList';
import Welcome from './Welcome';
import axios from 'axios';

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
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <ChatRoomList rooms={this.state.rooms}/>
          </div>
          <div className="col-md-9">
            <Welcome users={this.state.users}/>
          </div>
        </div>
      </div>
    );
  }
};

export default App;