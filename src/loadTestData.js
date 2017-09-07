import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';

MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);
  //db.dropCollection('chatrooms');
  //db.dropCollection('users');
  db.collection('chatrooms').insertMany([
    {
      "id": 1,
      "name": "United Kingdom",
      "userIds": [101, 102, 103, 104, 105]
    },
    {
      "id": 2,
      "name": "India",
      "userIds": [102, 103, 104, 105]
    },
    {
      "id": 3,
      "name": "Germany",
      "userIds": [101, 102, 104]
    },
    {
      "id": 4,
      "name": "France",
      "userIds": [101, 105]
    },
    {
      "id": 5,
      "name": "Netherland",
      "userIds": [102, 103, 104, 105]
    }
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
      db.close();
    })
  });
});