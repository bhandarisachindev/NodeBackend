const express = require('express');

const app=express();

app.use(express.json());  //middleware

let notes = [];

app.post("/notes",(req,res)=>{
  notes.push(req.body);
  
  res.json(
    {message:"notes added successfully",
     notes:notes
    });
});

app.patch("/notes",(req,res)=>{

});


app.delete("/notes",(req,res)=>{

});

app.listen(3000,()=>{
  console.log("server is running on port 3000.");
});

