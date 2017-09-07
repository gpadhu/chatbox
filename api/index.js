import express from 'express';
import data from '../src/chatRoomsData';
import axios from 'axios';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';

const router = express.Router();
let mdb;
MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  mdb = db;
});

router.get('/chatrooms', (req, res)=> {
  let chatrooms = {};
  mdb.collection('chatrooms').find({})
    .each((err, chatroom) => {
      assert.equal(null, err);

      if (!chatroom) {
        res.send( { chatrooms });
        return;
      }

      chatrooms[chatroom._id] = chatroom;
    });
});

router.get('/users', (req, res)=> {
  let users = {};
  mdb.collection('users').find({})
    .each((err, user) => {
      assert.equal(null, err);

      if (!user) {
        res.send( { users });
        return;
      }

      users[user._id] = user;
    });
});

export default router;