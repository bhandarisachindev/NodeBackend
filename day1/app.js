const http = require('http');

const server = http.createServer((req,res)=>{  //server creates and response is hello for every req
  res.end("Hello");
});



server.listen(3000,()=>{
  console.log("server is running on port 3000.");   // logs when server started
});