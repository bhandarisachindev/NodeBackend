const express = require('express');

const app= express();  //creates server

app.get('/home',(req,res)=>{
  res.send("Home");
});

app.get('/about',(req,res)=>{
  res.send("About");
});


app.listen(3000,()=>{
  console.log("server is running on port 3000.");
}); 