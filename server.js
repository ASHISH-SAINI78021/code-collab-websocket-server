const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require("./helper/action.js");
const path = require("path");
const app = express();

const server = http.createServer(app);
const io = new Server(server);

const PORT = 5000;
const userSocketMap = {};



const getAllConnectedClients = (roomId) => {
  // notes
  // io.sockets.adapter.rooms.get(roomId) -> it will return a hash map of connected users with socket id's
  // Array.from -> it will return an array

  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};

io.on("connection", (socket) => {
  console.log("socket-id", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);
    console.log(clients);

    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  // sync code
  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    console.log("I am listening it ");
    io.to(socketId).emit(ACTIONS.SYNC_CODE, { code });
  });

  // change code
  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    // console.log(`Received CODE_CHANGE for roomId ${roomId}`);
    // console.log(`Code received: ${code}`);
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // when user wants to disconnect but not disconnected yet
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

server.listen(PORT, () => {
  console.log("connected to socket..");
});
