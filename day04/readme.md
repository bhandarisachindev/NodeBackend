# Simple Express Notes API

This project is a basic REST API for managing notes using [Express.js](https://expressjs.com/). It allows you to create, update, delete, and view notes, all stored in memory.

## Endpoints

### 1. Add a Note

- **POST** `/notes`
- **Body:** JSON object with `title` and `content`
- **Example:**
  ```json
  {
    "title": "Shopping List",
    "content": "Eggs, Milk, Bread"
  }
  ```
- **Response:** `{ "message": "Note created succesully." }`

### 2. Edit a Note

- **PATCH** `/notes/:index`
- **Params:** `index` (the array index of the note)
- **Body:** JSON object with new `title` and `content`
- **Response:** `{ "message": "Updated Sucessfully." }`

### 3. Delete a Note

- **DELETE** `/notes/:index`
- **Params:** `index` (the array index of the note)
- **Response:** `{ "message": "Note deleted succesfully." }`

### 4. View All Notes

- **GET** `/`
- **Response:** Array of all notes

## How It Works

- Notes are stored in an in-memory array called `notes`.
- Each note is a JSON object with `title` and `content`.
- The API uses Express middleware to parse JSON request bodies.
- **Note:** Since notes are stored in memory, all data will be lost when the server restarts.

## Improvements you can do

- Deleting a note with `delete notes[index]` leaves an `undefined` at that index. Consider using `notes.splice(index, 1)` to remove the note and shift the array.
- No validation is performed on input data.
- Using array indices as IDs is not robust for production.
