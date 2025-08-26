const { Server } = require("socket.io");
const cookie=require('cookie');
const {geminiChat,generateVector}= require("../services/ai.service");
const messageModel=require('../models/message.model');
const jwt= require("jsonwebtoken");
const userModel = require("../models/user.model");
const {createMemory,queryMemory}=require("../services/pinecone.service");


async function initSocketServer(httpServer) {
  const io=new Server(httpServer,{  
     cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],       
        credentials: true                
      }
  })

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
      /////////////////////////
        const [resMsgModel,vectors]=await Promise.all([
          messageModel.create({
            chat:messageId,
            user:socket.user.id,
            role:"user",
            content:content
          }),
          generateVector(content) 
     ])

      /*
      const resMsgModel=  await messageModel.create({
        chat:messageId,
        user:socket.user.id,
        role:"user",
        content:content
      })
      const vectors=await generateVector(content);
        */
       await createMemory({
        vectors,
        messageId:resMsgModel._id,
        metadata:{
          chat:messageId,
          user:socket.user.id,
          text:content
        }
      }) 
      const [memory,chatHistory]=await Promise.all([
        queryMemory({
          queryVector:vectors,
          limit:5,
          metadata:{} 
        }),
        messageModel.find({
          chat: messageId
        }).sort({createdAt:-1}).limit(20).lean().then(msg=>msg.reverse())
      ])


      /*
      const memory=await queryMemory({
        queryVector:vectors,
        limit:5,
        metadata:{} 
      })
            const chatHistory=  (await messageModel.find({
        chat: messageId
      }).sort({createdAt:-1}).limit(20).lean()).reverse()  //to get only last 20 messages
      */
      const ltm=[
        {
          role:"user",
          parts:[{text:`these are some prevoius messages from chat system, use them to generate a response
            ${memory.map(item=>item.metadata.text).join("\n")}`
          }]
        }
      ]
      
      const stm=chatHistory.map(chat => ({
        role: chat.role,
        parts: [{ text: chat.content }]
      }));


      const aiRes = await geminiChat([...ltm,...stm]);

      socket.emit("ai-message-res",{
        messageId:messageId,
        content:aiRes
      });

      const [aiMsgRes,resVectors]=await Promise.all([
        messageModel.create({
          chat:messageId,
          user:socket.user.id,
          role:"model",
          content:aiRes
        }),
        generateVector(aiRes)
      ])

      /*
      const aiMsgRes= await messageModel.create({
        chat:messageId,
        user:socket.user.id,
        role:"model",
        content:aiRes
      })

      const resVectors=await generateVector(aiRes);
      */
      
      await createMemory({
          vectors: resVectors,
          messageId:aiMsgRes._id,
          metadata:{
            chat:messageId,
            user:socket.user.id,
            text:aiRes
          }
      })
    })  
  })
}


module.exports=initSocketServer;