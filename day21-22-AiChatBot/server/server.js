const app = require("./src/app");
const {createServer }= require('http');
const { Server } = require("socket.io");
const aiResponse = require("./src/services/ai.service");
const { text } = require("stream/consumers");
require('dotenv').config();

const httpServer=createServer(app);
const io = new Server(httpServer,{
  cors:{
    origin:"http://localhost:5173"
  }
});
const chatHistory=[];   //created a array for short term memory

io.on("connection", (socket) => {
  console.log("a user connected"); //when user connects

  socket.on("disconnect",()=>{
    console.log("user disconnected") //when user disconnects
  })
  socket.on("ai-chat",async (data)=>{   //when user triggers a custom event message

      chatHistory.push({   //to save user req
      role:"user",
      parts:[{text:data}]
    })

    const resData= await aiResponse(chatHistory);
    chatHistory.push({  //to save ai res
      role:"model",
      parts:[{text:resData}]
    })
    socket.emit("ai-chat-response",resData);
  }) 
});

httpServer.listen(process.env.PORT,()=>{
  return console.log("Server is running on port 3000.");
});