const e = require('express');
const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


let connectedUsers = {};


app.use(express.static(path.join(__dirname)));



io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for 'inputUpdate' events from any client
  socket.on('inputUpdate', (msg) => {
      console.log(`inputUpdate from ${socket.id}:`, msg);

      // Broadcast the update to all connected clients, including the sender
      io.emit('inputUpdate', msg);
  });

  socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
  });
});

//intervalUpdate();
function intervalUpdate(){
  
  sendMessageToAll("checko");
  
  setTimeout(() => {
      intervalUpdate();
  }, 1000);
}

function sendMessageToAll(message) {
  io.emit('message', message);
}

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
