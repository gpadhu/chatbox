import React from 'react';
import Room from './Room';
import axios from 'axios';

class App extends React.Component {
  state = {
    rooms: []
  };
  headerClicked = () => {
    console.log('header clicked');
  };
  componentDidMount() {
    axios.get('/api/chatrooms')
      .then(resp => {
        console.log(resp);
        this.setState({
          rooms: resp.data
        })
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <h1 onClick={this.headerClicked}>Hola from App Component!</h1>
        <Room rooms={this.state.rooms}/>
      </div>
    );
  }
};

export default App;