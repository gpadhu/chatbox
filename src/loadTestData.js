import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';

MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);
  db.dropCollection('chatrooms');
  db.dropCollection('users');
  db.dropCollection('conversations');

  db.collection('chatrooms').insertMany([
    { "id": 1, "name": "United Kingdom", "userIds": [101, 102, 103, 104, 105] },
    { "id": 2, "name": "India", "userIds": [102, 103, 104, 105] },
    { "id": 3, "name": "Germany", "userIds": [101, 102, 104, 105] },
    { "id": 4, "name": "France", "userIds": [101, 103, 102, 105] },
    { "id": 5, "name": "Netherland", "userIds": [102, 103, 104, 105]}
  ]).then(response => {
    console.log('Chatrooms imported:', response.insertedCount);
    db.collection('users').insertMany([
      { "id" : 101, "name" : "Padhu", "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"},
      { "id" : 102, "name" : "Alex", "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"},
      { "id" : 103, "name" : "Stephen", "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"},
      { "id" : 104, "name" : "Dave", "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"},
      { "id" : 105, "name" : "Scot", "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"}
    ]).then(response => {
      console.log("Users imported:", response.insertedCount);

      db.collection('conversations').insertMany([
        { "user" : 101, "name" : "Padhu",  "chatroom": 1, "message" : "Hai!", "timestamp" : new Date()},
        { "user" : 101, "name" : "Padhu",  "chatroom": 3, "message" : "Hola!", "timestamp" : new Date()},
        { "user" : 101, "name" : "Padhu",  "chatroom": 4, "message" : "Welcome!", "timestamp" : new Date()},
        { "user" : 101, "name" : "Padhu",  "chatroom": 1, "message" : "How are you!", "timestamp" : new Date()},
        { "user" : 101, "name" : "Padhu",  "chatroom": 3, "message" : "Whassap!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 2, "message" : "Good Morning!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 3, "message" : "Nice to see you!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 4, "message" : "Great!!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 5, "message" : "Bye!", "timestamp" : new Date()},
        { "user" : 103, "name" : "Stephen", "chatroom": 1, "message" : "Good!", "timestamp" : new Date()},
        { "user" : 103, "name" : "Stephen", "chatroom": 2, "message" : "Hola", "timestamp" : new Date()},
        { "user" : 103, "name" : "Stephen", "chatroom": 4, "message" : "Hellow!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 1, "message" : "Welcome!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 2, "message" : "How are you!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 3, "message" : "I'm good!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 5, "message" : "Nice to see you!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 1, "message" : "Hi everyone!", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 1, "message" : "Welcome", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 2, "message" : "Good Morning!", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 3, "message" : "Okay!", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 4, "message" : "Bye!", "timestamp" : new Date()},
        { "user" : 101, "name" : "Padhu",  "chatroom": 1, "message" : "Hai!", "timestamp" : new Date()},
        { "user" : 101, "name" : "Padhu",  "chatroom": 3, "message" : "Hola!", "timestamp" : new Date()},
        { "user" : 101, "name" : "Padhu",  "chatroom": 4, "message" : "Welcome!", "timestamp" : new Date()},
        { "user" : 101, "name" : "Padhu",  "chatroom": 1, "message" : "How are you!", "timestamp" : new Date()},
        { "user" : 101, "name" : "Padhu",  "chatroom": 3, "message" : "Whassap!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 2, "message" : "Good Morning!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 3, "message" : "Nice to see you!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 4, "message" : "Great!!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 5, "message" : "Bye!", "timestamp" : new Date()},
        { "user" : 103, "name" : "Stephen", "chatroom": 1, "message" : "Good!", "timestamp" : new Date()},
        { "user" : 103, "name" : "Stephen", "chatroom": 2, "message" : "Hola", "timestamp" : new Date()},
        { "user" : 103, "name" : "Stephen", "chatroom": 4, "message" : "Hellow!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 1, "message" : "Welcome!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 2, "message" : "How are you!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 3, "message" : "I'm good!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 5, "message" : "Nice to see you!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 1, "message" : "Hi everyone!", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 1, "message" : "Welcome", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 2, "message" : "Good Morning!", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 3, "message" : "Okay!", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 4, "message" : "Bye!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 2, "message" : "Good Morning!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 3, "message" : "Nice to see you!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 4, "message" : "Great!!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 5, "message" : "Bye!", "timestamp" : new Date()},
        { "user" : 103, "name" : "Stephen", "chatroom": 1, "message" : "Good!", "timestamp" : new Date()},
        { "user" : 103, "name" : "Stephen", "chatroom": 2, "message" : "Hola", "timestamp" : new Date()},
        { "user" : 103, "name" : "Stephen", "chatroom": 4, "message" : "Hellow!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 1, "message" : "Welcome!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 2, "message" : "How are you!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 3, "message" : "I'm good!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 5, "message" : "Nice to see you!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 1, "message" : "Hi everyone!", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 1, "message" : "Welcome", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 2, "message" : "Good Morning!", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 3, "message" : "Okay!", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 4, "message" : "Bye!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 2, "message" : "Good Morning!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 3, "message" : "Nice to see you!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 4, "message" : "Great!!", "timestamp" : new Date()},
        { "user" : 102, "name" : "Alex",  "chatroom": 5, "message" : "Bye!", "timestamp" : new Date()},
        { "user" : 103, "name" : "Stephen", "chatroom": 1, "message" : "Good!", "timestamp" : new Date()},
        { "user" : 103, "name" : "Stephen", "chatroom": 2, "message" : "Hola", "timestamp" : new Date()},
        { "user" : 103, "name" : "Stephen", "chatroom": 4, "message" : "Hellow!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 1, "message" : "Welcome!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 2, "message" : "How are you!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 3, "message" : "I'm good!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 5, "message" : "Nice to see you!", "timestamp" : new Date()},
        { "user" : 104, "name" : "Dave", "chatroom": 1, "message" : "Hi everyone!", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 1, "message" : "Welcome", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 2, "message" : "Good Morning!", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 3, "message" : "Okay!", "timestamp" : new Date()},
        { "user" : 105, "name" : "Scot", "chatroom": 4, "message" : "Bye!", "timestamp" : new Date()}
        ]).then(response => {
          console.log("Conversations imported:", response.insertedCount);
          db.close();
        });
    })
  });
});