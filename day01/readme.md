# Simple Node.js HTTP Server

This project is a basic HTTP server built with Node.js. It responds with `"Hello"` to every incoming request.

## How to Run

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Save the following code in a file, e.g., `server.js`:

    ```javascript
    const http = require('http');  //imports http

    const server = http.createServer((req, res) => {  //create a server with a response Hello for every request
      res.end("Hello");
    });

    server.listen(3000, () => {   //starts a server
      console.log("server is running on port 3000.");
    });
    ```

3. Start the server:

    ```
    node server.js
    ```

4. Open your browser and go to [http://localhost:3000](http://localhost:3000). You should see `Hello` displayed.

## How it Works

- The server listens on port 3000.
- For every HTTP request, it responds with the text `"Hello"`.
