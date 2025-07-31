# 🗒️ Note App Backend

This is a simple Node.js backend for a Note-taking application. It uses a modular folder structure and follows best practices for scalability.

## 📁 Project Structure

root/
│
├── node_modules/ # Installed dependencies
├── src/
│ ├── db/
│ │ └── db.js # Database connection logic
│ └── models/
│ └── note.model.js # Note schema/model
│
├── server.js # Application entry point
├── package.json # Project configuration and dependencies
├── package-lock.json # Exact dependency versions
└── Folder.md # (Optional) Folder structure description



## 📁 db
DB: Contains logic to connect to the database.

Models: Contains Mongoose models or schemas.

