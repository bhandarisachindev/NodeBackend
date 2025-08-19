const { Server } = require("socket.io");
const cookie=require('cookie');
const geminiChat= require("../services/ai.service");
const messageModel=require('../models/message.model');
const jwt= require("jsonwebtoken");
const userModel = require("../models/user.model");


async function initSocketServer(httpServer) {
  const io=new Server(httpServer,{})

  io.use(async (socket,next)=>{
    const cookies=cookie.parse(socket.handshake.headers.cookie || "");

      if(!cookies.token){
        next (new Error("No Token"));
      }
      try {
          const decoded=jwt.verify(cookies.token,process.env.JWT_SECRET);
          const user=await userModel.findById(decoded.id)
          socket.user=user;
          next();
      } catch (error) {
          next (new Error("Invalid Token"));
      }
  })


  io.on("connection",(socket)=>{
    socket.on("ai-message",async (messagePayload)=>{
      const {content,messageId}=messagePayload;

      await messageModel.create({
        chat:messageId,
        user:socket.user.id,
        role:"user",
        content:content
      })

      const chatHistory= await messageModel.find({
        chat:messageId
      })


        const aiRes = await geminiChat(chatHistory.map(chat => ({
          role: chat.role,
          parts: [{ text: chat.content }]
        }))
      );

      await messageModel.create({
        chat:messageId,
        user:socket.user.id,
        role:"model",
        content:aiRes
      })
    

      socket.emit("ai-message-res",{
        messageId:messageId,
        content:aiRes
      });

    })  
  })
}


module.exports=initSocketServer;