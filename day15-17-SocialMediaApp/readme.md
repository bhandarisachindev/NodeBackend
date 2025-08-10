# New Folder
## 📂 controller/
Purpose:
Holds functions that handle the main business logic for each API request.

A controller takes data from the request, processes it, interacts with the database or services, and sends back a response.

In your project:

auth.controller.js
Handles user-related actions like register, login, and checking username availability.

posts.controller.js
Handles post-related actions like uploading an image, generating a caption, and saving the post.

Why separate controllers?

Keeps route files clean — routes just say “what URL calls which function.”

Makes code easier to read and maintain.

💡 Analogy: Routes are the reception desk; controllers are the staff doing the actual work.
### User Registration Route
```js 
router.post('/register',()=>{
  const {username,password}=req.body;

  const checkUser=await userModel.findOne({
    username
  })

  if(checkUser){
    return res.status(409).json({
      message:"user already Exists."
    })
  }

  const user=await userModel.create({
    username,
    password: await bcrypt.hash(password,10)
  })

  res.status(201).json({
    message:"user Created"
  })
});

```

**Next, we'll break it into two parts.**
```js
router.post('/register',registerController);  //first part inside out route.js
```
**The second part is the main one, where all our functionality is saved as a function.**

```js
  async function registerController(req,res){
    const {username,password}=req.body;

    const checkUser=await userModel.findOne({
      username
    })

    if(checkUser){
      return res.status(409).json({
        message:"user already Exists."
      })
    }

    const user=await userModel.create({
      username,
      password: await bcrypt.hash(password,10)
    })

    res.status(201).json({
      message:"user Created"
    })
  }
```

# New Libraries
## 1️⃣ @google/genai
Type: Official Google Generative AI library.

Purpose: Lets you use Google’s AI models (like Gemini) for text generation, image analysis, etc.

In your app:

You send an uploaded image (as base64) to Google Gemini.

Gemini returns a short caption for that image.

Install:
```
npm install @google/genai
```
## 2️⃣ bcryptjs
Type: Library for hashing passwords.

Purpose: Turns plain text passwords into an irreversible encrypted string before storing them in the database.

In your app:

Used during registration to hash the password.

Used during login to compare the entered password with the stored hash.

Install:

```
npm install bcryptjs
```
## 3️⃣ uuid
Type: Library for generating universally unique IDs.

Purpose: Creates unique strings that are almost impossible to repeat.

In your app:

Used to generate unique image file names before uploading to ImageKit.

Install:
```
npm install uuid
```

# 📌 Social Media App Backend

A simple backend for a social media app where users can register, log in, upload images, and get AI-generated captions.

---

## 📂 Folder Structure
```
day15-17-socialmediaapp/
│
├── server.js # Entry point of the application, starts the server
├── package.json # Project dependencies and scripts
├── .env # Environment variables (not committed to Git)
│
├── src/
│ ├── app.js # Express app setup (routes, middlewares)
│ │
│ ├── db/
│ │ └── db.js # MongoDB connection setup
│ │
│ ├── models/
│ │ ├── user.model.js # User schema and model
│ │ └── posts.model.js # Post schema and model
│ │
│ ├── controller/
│ │ ├── auth.controller.js # Handles user registration, login, username check
│ │ └── posts.controller.js # Handles creating posts with image upload + AI caption
│ │
│ ├── middlewares/
│ │ └── auth.middleware.js # JWT authentication middleware
│ │
│ ├── routes/
│ │ ├── auth.routes.js # Routes for authentication-related APIs
│ │ └── posts.routes.js # Routes for post-related APIs
│ │
│ ├── services/
│ │ ├── ai.service.js # Google GenAI service for generating captions
│ │ └── imagekit.service.js # ImageKit service for image upload
│ │
│ └── utils/ # (Optional) Utility/helper functions
│
└── README.md # Project documentation (this file)
```

```
---

## 🚀 Features
- **User Authentication** with JWT and cookies
- **Password Encryption** using bcrypt
- **Image Upload** to ImageKit
- **AI-Generated Captions** using Google GenAI
- **MongoDB Database** with Mongoose
- **Protected Routes** for logged-in users

---
```
# 📌 API Endpoints
Auth Routes
POST /auth/register → Register new user

POST /auth/login → Log in user

GET /auth/check-username → Check if username exists

Post Routes
POST /create-post → Upload image + generate caption (Protected route)