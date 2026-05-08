const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(express.static('public'));

const rooms = {};

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  socket.on('joinRoom', (roomCode) => {
    if (!rooms[roomCode]) {
      rooms[roomCode] = { players: [], turn: 'w' };
    }
    const room = rooms[roomCode];

    if (room.players.length >= 2) {
      socket.emit('roomFull');
      return;
    }

    room.players.push(socket.id);
    socket.join(roomCode);
    socket.roomCode = roomCode;

    const color = room.players.length === 1 ? 'w' : 'b';
    socket.color = color;
    socket.emit('assignColor', color);

    io.to(roomCode).emit('playerCount', room.players.length);

    if (room.players.length === 2) {
      io.to(roomCode).emit('gameStart');
    }
  });

  socket.on('move', ({ roomCode, from, to, special }) => {
    const room = rooms[roomCode];
    if (!room) return;
    room.turn = room.turn === 'w' ? 'b' : 'w';
    socket.to(roomCode).emit('opponentMove', { from, to, special });
  });

  socket.on('gameOver', ({ roomCode, result }) => {
    socket.to(roomCode).emit('gameOver', result);
  });

  socket.on('disconnect', () => {
    const roomCode = socket.roomCode;
    if (roomCode && rooms[roomCode]) {
      rooms[roomCode].players = rooms[roomCode].players.filter(id => id !== socket.id);
      io.to(roomCode).emit('playerCount', rooms[roomCode].players.length);
      io.to(roomCode).emit('opponentLeft');
      if (rooms[roomCode].players.length === 0) {
        delete rooms[roomCode];
      }
    }
    console.log('Player disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Chess server running on http://localhost:${PORT}`));
