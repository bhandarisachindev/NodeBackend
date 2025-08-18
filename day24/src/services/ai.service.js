require('dotenv').config() 
const {GoogleGenAI} = require("@google/genai");

const ai = new GoogleGenAI({});

const sortMemory=[];

async function geminiChat(message) {
  sortMemory.push({
        role: "user",
        parts: [{ text: message}],
      });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: sortMemory,
    config: {
      systemInstruction: "You are a chatbot, and you must reply with plain text only, without Markdown, unless the user specifies otherwise.",
    },
  });
  sortMemory.push({
        role: "model",
        parts: [{ text: message }],
      });
  return response.text;
}

module.exports=geminiChat;