import express from 'express';
import data from '../src/chatRoomsData';
import axios from 'axios';
import { MongoClient, ObjectID } from 'mongodb';
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

router.get('/chatroom/:id/conversations', (req, res)=> {
  let conversations = {};
  let chatroom = req.params.id;
  mdb.collection('conversations').find({ chatroom : Number(chatroom) })
    .each((err, conversation) => {
      assert.equal(null, err);
      
      if (!conversation) {
        res.send( { conversations });
        return;
      }

      conversations[conversation._id] = conversation;
    });
});


router.put('/chatroom/:id', (req, res)=> {
  mdb.collection('chatrooms').updateOne(
    { _id: ObjectID(req.params.id) },
    { $push: { userIds: Number(req.body.user) }})
  .then( (result) => {
    res.send( { result });
  });
});

router.put('/chatroom/:id/:user', (req, res)=> {
  console.log(req.params, req.body);
  mdb.collection('chatrooms').updateOne(
    { _id: ObjectID(req.params.id) },
    { $pull: { userIds: Number(req.params.user) }})
  .then( (result) => {
    res.send( { result });
  });
});

router.post('/conversations', (req, res)=> {
  mdb.collection('conversations').insertOne({
    "name" : req.body.name,
    "user": req.body.user,
    "chatroom": req.body.chatroom,
    "message": req.body.message,
    "timestamp": req.body.timestamp})
  .then((result) => {
    let newMessage = result.ops[0];
    res.send({ newMessage });
  });
});

router.put('/conversation/:id', (req, res)=> {
  mdb.collection('conversations').updateOne(
    { _id: ObjectID(req.params.id) },
    { $set: {message: req.body.message }})
  .then((result) => {
    res.send({ result });
  });
});

router.delete('/conversation/:id', (req, res) => {
  mdb.collection('conversations').remove({ _id: ObjectID(req.params.id)})
    .then((result) => {
      res.send( { result });
    });
});

export default router;