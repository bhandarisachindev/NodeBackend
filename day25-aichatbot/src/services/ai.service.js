require('dotenv').config() 
const {GoogleGenAI} = require("@google/genai");
const messageModel=require('../models/message.model');

const ai = new GoogleGenAI({});


async function geminiChat(message) {

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: message,
    config: {
      systemInstruction: "You are a chatbot, and you must reply with plain text only, without Markdown, unless the user specifies otherwise.",
    },
  });
  return response.text
}

module.exports=geminiChat;