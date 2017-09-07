var env = process.env;

export default {
  port: env.PORT || 8080,
  mongodbUri: 'mongodb://localhost:27017/chatbox',
  current_user: 101,
  setCurrentUser(id) {
    this.current_user = id
  }
}