const app = require("./src/app");
const { Server } = require("socket.io");

const io = new Server();
io.attachApp(app);

io.on("connection", (socket) => {
  // ...
});

app.listen(3000,()=>{
  return console.log("Server is running on port 3000.");
});