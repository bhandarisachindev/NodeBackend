
const {Server}=require('socket.io');
const geminiChat=require('../services/ai.service');

async function setUpSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  io.on('connection', (socket) => {
    console.log("A user connected.");

    socket.on('ai-message',async (message)=>{
      const aiRes=await geminiChat(message);
      socket.emit("ai-message-res",aiRes);
    })

    socket.on('disconnect',()=>{
    console.log("User disconnected.")
  })
  });
  
}


module.exports=setUpSocketServer;