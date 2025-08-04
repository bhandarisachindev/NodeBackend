const express = require('express');
const connectToDB = require("./src/db/db");

connectToDB();
const app=express();

//server will connect 

app.use(express.json());  //middleware

app.get('/',(req,res)=>{
  res.end("Hello!");
})

app.post("/notes",(req,res)=>{
  const {title,id,content}=req.body;
  console.log(req.body);
  res.end();
}); 

app.listen(3000,()=>{
  console.log("server is running on port 3000.");
});

