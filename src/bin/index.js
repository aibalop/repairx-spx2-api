import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import config from '../utils/config.util.js';
import app from '../app.js';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const URL_CONNECTION = `mongodb://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}?authSource=admin`;

console.log(URL_CONNECTION);

mongoose.connect(URL_CONNECTION, (err, _) => {
  if (err) {
    console.log('Error to connect with database... ', err);
  } else {
    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('new-message', (conversation) => {
        console.log(conversation);
        io.emit(`listen-conversation-${conversation._id}`);
        io.emit(
          `listen-conversation-list-user-${conversation.userOneId._id}`
        );
        io.emit(
          `listen-conversation-list-user-${conversation.userTwoId._id}`
        );
      });
    });

    server.listen(config.api.port || 3000, () => {
      console.log(`API: ${config.api.name}`);
      console.log(`API runs in port: ${config.api.port || 3000}`);
    });
  }
});
