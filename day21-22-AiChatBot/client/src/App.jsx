import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState("");
  const [history, setHistory] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setHistory((prev) => [...prev, userMessage]);
    setInput("");

    if (socket) {
      socket.emit("ai-chat", input);

      socket.once("ai-chat-response", (reply) => {
        const botMessage = { sender: "bot", text: reply || "No response" };
        setHistory((prev) => [...prev, botMessage]);
      });
    } else {
      setHistory((prev) => [
        ...prev,
        { sender: "bot", text: "Error: Socket not connected." },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    const socketIns = io("http://localhost:3000");
    setSocket(socketIns);
  }, []);

  return (
    <div className="fullscreen-bg">
      <div className="chat-container dark">
        <h2>AI Chatbot</h2>
        <div className="chat-history">
          {history.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${
                msg.sender === "user" ? "user" : "bot"
              }`}
            >
               {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
