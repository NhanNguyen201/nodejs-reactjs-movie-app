const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  console.log("Connect");
  socket.on('join', ({ name, roomHost }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, roomHost });
    if(error) return callback(error);
    socket.join(user.roomHost);
    socket.emit('message', { user: 'admin', text: `hello ${user.name} 🖐️, welcome to room ${user.roomHost}.`});
    socket.broadcast.to(user.roomHost).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    io.to(user.roomHost).emit('roomData', { roomHost: user.roomHost, users: getUsersInRoom(user.roomHost) });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.roomHost).emit('message', { user: user.name, text: message });
    callback();
  });
  // send video REQ
  socket.on('sendVideo', ({ video }) => {
    const user = getUser(socket.id);
    io.in(user.roomHost).emit('receiveVideo', { video: video });
  })
  // change room name REQ
  socket.on('changeRoomNameReq', ({newName}) => {
    const user = getUser(socket.id);
    io.in(user.roomHost).emit('changeRoomNameRes', {newRoomName: newName})
  })

  // Get video when join room
  socket.on('getOnJoin', () => {
    const user = getUser(socket.id);
    const newId = socket.id;
    socket.to(user.roomHost).emit('getOnJoinServerReq', {newId: newId})
  })
  socket.on('getOnJoinClientRes', ({newId,currentVideo, roomName, playState, played}) => {
    // const user = getUser(socket.id);
    io.to(`${newId}`).emit('getOnJoinServerRes', {
      currentVideo: currentVideo,
      roomName: roomName,
      playState: playState,
      played_rep: played
    })
  })
  //
  // Video Manipulation
  socket.on('seekVideo', ({val}) => {
    const user = getUser(socket.id);
    io.in(user.roomHost).emit('seekVideoFromServer', {val: val})
  })
  socket.on('pauseVideo', ({isPause}) => {
    const user = getUser(socket.id);
    io.in(user.roomHost).emit('pauseVideoFromServer', {setPause: isPause})
  })
  //
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if(user) {
      io.to(user.roomHost).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.roomHost).emit('roomData', { roomHost: user.roomHost, users: getUsersInRoom(user.roomHost)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));