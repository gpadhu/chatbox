import express from 'express';
import data from '../src/chatRoomsData';

const router = express.Router();

router.get('/chatrooms', (req, res)=> {
  res.send(data.chatRooms);
});

export default router;