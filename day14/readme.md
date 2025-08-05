## New Dependencies

**cookie-parser**: Middleware for Express that parses cookies attached to the client request object, making them available via req.cookies. It also supports signed cookies for security, making it easier to read, set, and validate cookies in Express applications.


**jsonwebtoken**: Library for creating and verifying JSON Web Tokens (JWTs). JWTs are commonly used for stateless authentication in APIs, session management, and securely transmitting information between parties.

---

### 📁 Project Structure: Node.js + Express + MongoDB

```
DAY14/
├── src/
│   ├── db/
│   │   └── db.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   └── auth.routes.js
│   └── app.js
├── server.js
├── .env
├── .env.example
├── folder.md
``` 

---

### 🗂️ Folder/File Breakdown

#### `src/`
Main source directory that contains all core logic for your application.

---

#### `src/db/db.js`
- Manages the database connection.
- Mongoose to connect to MongoDB.

---

#### `src/models/user.model.js`
- Defines the structure (schema) of the user document.
- Used by Mongoose to interact with the `users` collection in the database.

---

#### `src/app.js`
- Sets up the Express app instance.
- Applies middleware (like `express.json()`).
- Connects route files to the app (e.g., `auth.routes.js`).

---

#### `server.js`
- Entrypoint for the server.
- Imports the app from `app.js` and starts listening on the specified port.

---

#### `.env`
- Stores environment-specific variables (e.g., MongoDB URI, port number).
- Should not be committed to version control.

---

#### `.env.example`
- A sample `.env` file to share with others.
- Helps teammates know what variables are expected.

---

#### `folder.md`
- Likely used for internal documentation, notes, or planning.
- Markdown format for easy readability.

---

#### `src/routes/auth.routes.js  JWT`
- Contains route definitions related to authentication and simpleJWT operations.
- Examples: `POST /login`, `POST /register`.


### 1. Imports, Configurations and Router Setup
``` js //
const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();
``` 
**express**: Web framework for Node.js.

**userModel**: Mongoose model for the User collection (schema defined elsewhere).

**jsonwebtoken (jwt)**: Used for creating/verifying JWT tokens.

**router**: Express router to handle routes.

**dotenv**: Loads environment variables (e.g., JWT_SECRET) from a .env file.



### 2. POST /register – User Registration
``` js //
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  
  const user = await userModel.create({
    username, password
  })

  const token = jwt.sign({
    id: user._id,
  }, process.env.JWT_SECRET);

  res.cookie("user_token", token)

  res.status(201).json({
    message: "User Created Successfully.",
    user
  })
})
``` 
Steps:
Extracts username and password from the request body.

Creates a new user in the database.

Generates a JWT token with the user's _id (using JWT_SECRET from environment).

Sets a cookie named user_token with the token.

Responds with status 201 (Created) and the user data.


### 3. POST /login – User Login
``` js //
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) {
    return res.status(401).json({
      message: "User not Found.",
      user: username
    })
  }

  if (password != user.password) {
    return res.status(401).json({
      message: "Incorrect Password."
    })
  }

  res.status(200).json({
    message: "Login Sucessfully."
  })
})
``` 
Steps:
Fetches the user by username.

Checks if the user exists:

If not found, responds with status 401 and "User not Found."

Compares the provided password with what's in the database:

If it doesn't match, responds with status 401 and "Incorrect Password."

If successful, responds with status 200 and "Login Successfully."


### 4. GET /user – Get User Info
``` js //
router.get('/user', async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({
      _id: decoded.id
    }).select("-password -__v")

    res.status(200).json({
      user
    })

  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized -Invalid User-credentials"
    })
  }
});
``` 
Steps:
Receives a token from the request body.

Attempts to verify the JWT token:

If verification fails, responds with status 401 and error message.

If successful, looks up the user by decoded ID and excludes the password and __v fields.

Responds with the user data.

### 5. Exporting the router
``` js //
module.exports = router;
``` 
Allows this router to be imported into the main application.

Summary & Important Notes:
Route functions are asynchronous (async/await) for smooth DB interactions.

JWT tokens are used to securely identify users across requests.

User passwords are saved and compared in plain text—do not do this in production! Always hash passwords with a library (like bcrypt).

User token is set as a cookie during registration... but not during login—usually this should happen at login.

For /user route, sending the token in the request body is unusual and insecure—it’s normally provided in the header (Authorization: Bearer token) or from a cookie.