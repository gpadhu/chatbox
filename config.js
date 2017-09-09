var env = process.env;

export default {
  port: env.PORT || 8080,
  mongodbUri: 'mongodb://localhost:27017/chatbox',
  currentUser: '',
  currentRoom: 'welcome',
  setCurrentUser(id) {
    this.currentUser = id
  },
  setCurrentRoom(id) {
    this.currentRoom = id
  }
}