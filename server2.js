const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require("./helper/action.js");
const app = express();

const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// make a connection
// it is establishing a connection
io.on("connection", (socket) => {
  console.log("socket-id", socket.id);

 // In server code
socket.on(ACTIONS.CHAT_MESSAGE, ({ roomId, message, username }) => {
    // Broadcast the chat message to all clients in the room
    io.in(roomId).emit(ACTIONS.CHAT_MESSAGE, { message, username });
  });
  

//   // disconnecting
//   socket.on("disconnect", () => {
//     console.log("User disconnected: ", socket.id);
//   });
});

server.listen(PORT, () => {
  console.log("connected to socket2...");
});
