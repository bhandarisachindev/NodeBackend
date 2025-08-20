const { Server } = require("socket.io");
const cookie=require('cookie');
const {geminiChat,generateVector}= require("../services/ai.service");
const messageModel=require('../models/message.model');
const jwt= require("jsonwebtoken");
const userModel = require("../models/user.model");
const {createMemory,queryMemory}=require("../services/pinecone.service");


async function initSocketServer(httpServer) {
  const io=new Server(httpServer,{})

  io.use(async (socket,next)=>{
    const cookies=cookie.parse(socket.handshake.headers.cookie || "");

      if(!cookies.token){
        next (new Error("No Token"));
      }
      try{
          const decoded=jwt.verify(cookies.token,process.env.JWT_SECRET);
          const user=await userModel.findById(decoded.id)
          socket.user=user;
          next();
      }catch(error){
          next (new Error("Invalid Token"));
      }
  })


  io.on("connection",(socket)=>{
    socket.on("ai-message",async (messagePayload)=>{
      const {content,messageId}=messagePayload;

      const resMsgModel=  await messageModel.create({
        chat:messageId,
        user:socket.user.id,
        role:"user",
        content:content
      })
      const vectors=await generateVector(content);

      await createMemory({
        vectors,
        messageId:resMsgModel._id,
        metadata:{
          chat:messageId,
          user:socket.user.id,
          text:content
        }
      })

      const memory=await queryMemory({
        queryVector:vectors,
        limit:3,
        metadata:{}
      })

      console.log(memory)

      const chatHistory=  (await messageModel.find({
        chat:messageId
      }).sort({createdAt:-1}).limit(4).lean()).reverse()  //to get only last 6 messages


      const aiRes = await geminiChat(chatHistory.map(chat => ({
        role: chat.role,
        parts: [{ text: chat.content }]
      })));

      const aiMsgRes= await messageModel.create({
        chat:messageId,
        user:socket.user.id,
        role:"model",
        content:aiRes
      })

      const resVectors=await generateVector(aiRes);
      
      await createMemory({
          vectors: resVectors,
          messageId:aiMsgRes._id,
          metadata:{
            chat:messageId,
            user:socket.user.id,
            text:aiRes
          }
      })


      socket.emit("ai-message-res",{
        messageId:messageId,
        content:aiRes
      });

    })  
  })
}


module.exports=initSocketServer;