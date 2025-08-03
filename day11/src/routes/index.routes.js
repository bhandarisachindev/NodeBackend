const express = require('express');
const router=express.Router();

express.json()

router.use((req,res,next)=>{
  console.log("This is between router and api.");
  next();
})

router.get('/',(req,res)=>{
  res.json({
    message:"Response"
  })
})

module.exports=router; 