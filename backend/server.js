module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

// 4. Setting up a WebSocket Server (backend/server.js)
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("New Admin Connected", socket.id);
  socket.on("sendCommand", (data) => {
    console.log("Command Sent: ", data);
    io.emit("receiveCommand", data); // Broadcast command
  });
});

server.listen(3001, () => console.log("WebSocket Server Running on Port 3001"));
