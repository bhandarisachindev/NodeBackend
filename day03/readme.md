# Express Notes API

This project demonstrates a simple REST API using Express.js that allows you to add notes via a POST request.

## How It Works

- The server uses Express and listens on port 3000.
- It uses middleware to parse incoming JSON request bodies.
- Notes are stored in an in-memory array (not persistent).
- You can add a note by sending a POST request to `/notes` with a JSON body.
- The server responds with a success message and the current list of notes.

## Example Code

```javascript
const express = require('express');

const app = express();

app.use(express.json());  // Middleware to parse JSON

let notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.json({
    message: "notes added successfully",
    notes: notes
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000.");
});
```

## Example Usage

Send a POST request to `http://localhost:3000/notes` with a JSON body, for example:

```json
{
  "title": "First note",
  "content": "This is a note."
}
```

**Response:**

```json
{
  "message": "notes added successfully",
  "notes": [
    {
      "title": "First note",
      "content": "This is a note."
    }
  ]
}
```

## Notes

- Data is not persistent; all notes are lost when the server restarts.
- No validation is performed on the