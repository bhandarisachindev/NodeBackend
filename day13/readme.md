#📁 In This Folder
Created a user model and performed basic user login actions.
This is just for practice and not very important, so you can skip it and continue from Day 14 if you prefer.



🧩 User Model (models/user.model.js)
This file defines a User Schema and Model using Mongoose to interact with the MongoDB users collection.

📦 Dependencies
```
const mongoose = require('mongoose');
```
Imports the Mongoose library, which helps you:

Define schemas

Interact with MongoDB using JavaScript

Validate and model data

🧱 Define Schema
```
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
```
🔹 Description:
Defines the structure (schema) of a User document in MongoDB.

Fields:

username: A string (required field for login)

password: A string (the user's password)

⚠️ Currently, this schema does not include validation or password encryption. Those should be added for production use.

🏗️ Create Model
```
const userModel = mongoose.model("user", userSchema);
```
🔹 Description:
Creates a Mongoose Model named "user" based on the userSchema.

Internally, Mongoose will use a collection called users (it auto-pluralizes the model name).

The userModel allows you to:

Create users (userModel.create())

Find users (userModel.findOne(), userModel.findById())

Update or delete users


📁 User Routes (routes/user.js)
This file defines two main API routes: /register and /login using Express and a Mongoose User Model.

📦 Dependencies
```
const express = require('express');
const userModel = require('../models/user.model');
express: Used to create routes and handle HTTP requests.
```
userModel: Mongoose model to interact with the users collection in MongoDB.

🔁 Create a Router
```
const router = express.Router();
Creates a new Express router to group user-related routes.
```

📝 POST /register
```
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.create({ username, password });

  res.status(201).json({
    message: "User Created Successfully.",
    user: user
  });
});
```
🔹 Description:
Receives username and password from the request body.

Creates a new user in MongoDB using Mongoose.

Sends back a 201 Created status with the created user data.

🔐 ❗ Note:
Passwords are stored in plain text (❌ bad practice).

In production, always hash passwords using bcrypt.

🔐 POST /login
```
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username: username });

  if (!user) {
    return res.status(401).json({
      message: "User not Found.",
      user: username
    });
  }

  if (password !== user.password) {
    return res.status(401).json({
      message: "Incorrect Password."
    });
  }

  res.status(200).json({
    message: "Login Successfully."
  });
});
```
🔹 Description:
Finds the user in the database by username.

If user is not found → responds with 401 Unauthorized.

If password is incorrect → responds with 401 Unauthorized.

If valid → responds with 200 OK and success message.

🚀 Exporting the Router
```
module.exports = router;
```
Makes the router available to be used in app.js or index.js like:
```
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);
```
