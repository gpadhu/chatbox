import config from './config';
import express from 'express';
import apiRouter from './api';
import bodyParser from 'body-parser';

const server = express();

server.set('view engine', 'ejs');

server.get('/', (req, res) => {
  res.render('index');
});
server.use(bodyParser());
server.use(express.static("public"));
server.use('/api', apiRouter);

server.listen(config.port, ()=> {
  console.info("Express listening on port", config.port);
});