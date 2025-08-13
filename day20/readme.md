This file explains a simple configuration of a server using Express for HTTP requests and Socket.IO for real-time WebSocket connections.
This project is split into two main files: app.js and server.js.
It uses Express for handling HTTP requests and Socket.IO for real-time WebSocket connections.

# 1. app.js
```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.end("Hello World!");
});

module.exports = app;
Explanation
express: A Node.js web application framework for building APIs and web servers.

app = express(): Creates an Express application instance.

app.get('/', ...): Defines a GET route for / (root URL).
When a request comes in, it responds with "Hello World!".

module.exports = app: Exports the app object so it can be used in other files (like server.js).
```
## Explanation
- express: A Node.js web application framework for building APIs and web servers.

- app = express(): Creates an Express application instance.

- app.get('/', ...): Defines a GET route for / (root URL).
- When a request comes in, it responds with "Hello World!".

- module.exports = app: Exports the app object so it can be used in other files (like server.js).

# 2. server.js
```js
const app = require("./src/app");
const { createServer } = require('http');
const { Server } = require("socket.io");
require('dotenv').config();

const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  //...
});

httpServer.listen(process.env.PORT, () => {
  return console.log("Server is running on port 3000.");
});
```
## Explanation:

- require("./src/app"): Imports the Express app from app.js.

- createServer(app): Wraps the Express app in a standard Node.js HTTP server.

- This allows it to handle both HTTP requests and WebSocket connections.

- require("socket.io"): Imports Socket.IO for real-time communication.

- new Server(httpServer, {}): Attaches Socket.IO to the HTTP server.

- io.on("connection", callback): Listens for a new WebSocket client connection.

- require('dotenv').config(): Loads environment variables from a .env file.

- httpServer.listen(process.env.PORT, ...): Starts the HTTP server on the given port from .env.

## How the Flow Works
HTTP request flow:

A browser sends a request to /.

app.js handles it and sends "Hello World!".

WebSocket flow:

A client connects using Socket.IO.

The io.on("connection") event runs when a new client connects.

You can then send/receive messages in real time.