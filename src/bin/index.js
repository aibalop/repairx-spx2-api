import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';

import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '..', '..', '.env');
dotenv.config({ path: envPath });

import config from '../utils/config.util.js';
import app from '../app.js';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

console.log(process.env.DB_HOST);

const URL_CONNECTION = `mongodb://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`;

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

    server.listen(config.app.port || 3000, () => {
      console.log(`API: ${config.app.name}`);
      console.log(`Author: ${config.app.author}`);
      console.log(`API runs in port: ${config.app.port || 3000}`);
    });
  }
}
);
