# Node.js – Basic HTTP Server

---

## 1. Import HTTP Module
```js
const http = require('http');
Purpose: Brings in Node.js' built-in http module.

Allows you to create a web server without any external libraries.

2. Create Server
const server = http.createServer((req, res) => {
  res.end("Hello");
});
http.createServer() → Creates a server instance.
```
Callback Parameters:

req → Request object (information from the client).

res → Response object (used to send data back to client).

res.end("Hello") → Sends "Hello" as the response and ends the request.

3. Start the Server
```js
server.listen(3000, () => {
  console.log("server is running on port 3000.");
});
```
server.listen(port, callback) → Binds server to a port (here, 3000) and starts listening for requests.

Callback → Runs once the server successfully starts.

Console Log → Confirms that server is running.

4. Flow
Client sends a request to http://localhost:3000.

Server receives request → Runs the callback inside createServer().

Sends back "Hello" as the response.

Connection closes.
