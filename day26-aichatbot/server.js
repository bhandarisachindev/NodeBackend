require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/db/db');
const initSocketServer = require('./src/sockets/socket');
const httpServer=require('http').createServer(app);




connectToDB();
initSocketServer(httpServer);

httpServer.listen(process.env.PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}.`)
});

