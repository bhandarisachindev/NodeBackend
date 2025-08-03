const express = require('express');
const indexRoute=require('./routes/index.routes');

const app=express();

app.use((req,res,next)=>{
  console.log("This is between app and router.");
  next();
})

app.use('/',indexRoute);

module.exports=app;