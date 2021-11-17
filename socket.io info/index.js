const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

//Socket.io is composed of two parts:
//a server that integrates with (or mounts on) the Node.JS HTTP Server socket.io
//A client library that loads on the browser side socket.io-client
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// listen on the connection event for incoming sockets and log it to the console.
// socket.broadcast.emit somewhere to have message emit to everyone but sender
io.on('connection', (socket) => {
    socket.on('chat message', msg => {
      io.emit('chat message', msg);
    });
  });

server.listen(PORT, () => {
  console.log('listening on http://localhost:' + PORT);
});


// Version in socket.io github.
// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   socket.on('chat message', msg => {
//     io.emit('chat message', msg);
//   });
// });

// http.listen(port, () => {
//   console.log(`Socket.IO server running at http://localhost:${port}/`);
// });