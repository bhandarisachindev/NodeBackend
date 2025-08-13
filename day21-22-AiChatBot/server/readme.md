## Enabling CORS for Socket.IO

When building a chat application with a frontend and backend running on different ports or domains (for example, React on `localhost:5173` and your Node.js server elsewhere), you need to enable [CORS (Cross-Origin Resource Sharing)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) so that browsers allow the frontend to communicate with your backend via WebSockets.

To enable CORS in your Socket.IO server, configure it like this:

```javascript
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173"
  }
});
```

**Explanation:**
- The `origin` option specifies which frontend origins are allowed to connect to your Socket.IO server.
- In this example, only requests from `http://localhost:5173` will be accepted.
- Adjust the `origin` value as needed for your deployment (e.g., your production frontend URL).



## Short Term Memory in Chat

The `chatHistory` array acts as short term memory for the chat. It stores the sequence of user messages and AI responses during a session. Each new message or response is added to this array, allowing the AI to generate context-aware replies based on recent conversation history.
Initial state

```js
const chatHistory = [];
```
Starts empty when your server starts.

This is in-memory, so if you restart the server, it resets.

When the user sends a message (ai-chat event)

```js
chatHistory.push({
  role: "user",
  parts: [{ text: data }]
});
```
Adds an object representing the user’s latest message.

Example after first user message "Hi":

```js
[
  { role: "user", parts: [{ text: "Hi" }] }
]
```
When the AI sends a reply

```js

chatHistory.push({
  role: "model",
  parts: [{ text: resData }]
});
```
Adds another object, this time for the AI’s response.

Example after AI replies "Hello!":

```js

[
  { role: "user", parts: [{ text: "Hi" }] },
  { role: "model", parts: [{ text: "Hello!" }] }
]
```
Cycle repeats

Every time the user sends a new message, two pushes happen:

- User message is added.
- AI message is added.
- This keeps the array in chronological order of the conversation.

## Why it’s called short-term memory here
- It only exists while the server is running.
- Once the server restarts or crashes, the array is cleared.
- It's shared for all connected clients (unless you make it user-specific).
