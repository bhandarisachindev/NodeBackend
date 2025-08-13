const app = require("./src/app");
const {createServer }= require('http');
const { Server } = require("socket.io");
require('dotenv').config();

const httpServer=createServer(app);
const io = new Server(httpServer,{});

io.on("connection", (socket) => {
  //...
});

httpServer.listen(process.env.PORT,()=>{
  return console.log("Server is running on port 3000.");
});