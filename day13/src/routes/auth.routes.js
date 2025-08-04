const express = require('express');
const userModel = require('../models/user.model');

const router=express.Router();

router.post("/register",async (req,res)=>{
  const {username,password}=req.body;

  const user=await userModel.create({
    username,password
  })
  res.status(201).json({
    message:"User Created Successfully.",
    user:user
  })
})

router.post("/login",async (req,res)=>{
  const {username,password}=req.body;

  const user=await userModel.findOne({
    username:username
  })

  if(!user){
    return res.status(401).json({
      message:"User not Found.",
      user:username
    })
  }

  if(password !=user.password){
    return res.status(401).json({
      message:"Incorrect Password."
    })
  }
  
  res.status(200).json({
    message:"Login Sucessfully."
  })
})


module.exports=router;