const { GoogleGenAI } =require('@google/genai');
require("dotenv").config() ;

const ai = new GoogleGenAI({});

async function generateCaption(base64Image){
  const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64Image,
    },
  },
  { text: "Caption this image." },
  ];  

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config:{
      systemInstruction:"You are an expert at generating captions for images,you generate  single sentence captions that are descriptive and engaging, you use hashtags and emojis to enhance the captions."
    }
  });
  return response.text;
} 

module.exports= generateCaption;  