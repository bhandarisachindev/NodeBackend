require('dotenv').config();
const http = require('http');
const app = require("./src/app");
const connectTODb = require('./src/db/db');
const setUpSocketServer = require('./src/socket/socket.server');

const httpServer= http.createServer(app);
setUpSocketServer(httpServer);

connectTODb();

httpServer.listen(process.env.PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}`)
});