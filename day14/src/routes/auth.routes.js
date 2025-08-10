const express = require('express');
const userModel = require('../models/user.model');
const jwt=require('jsonwebtoken');
const router=express.Router();
require('dotenv').config();

router.post("/register",async (req,res)=>{
  const {username,password}=req.body;

  const user=await userModel.create({
    username,password
  })
  const token=jwt.sign({
    id:user._id,
  },process.env.JWT_SECRET);

  res.cookie("user_token",token)

  res.status(201).json({
    message:"User Created Successfully.",
    user
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

router.get('/user',async (req,res)=>{
  const {token}=req.body;
  try {
    const decoded= jwt.verify(token,process.env.JWT_SECRET);

     const user=await userModel.findOne({
        _id:decoded.id
      }).select("-password -__v")

      res.status(200).json({
        user
      })

  } catch (error) {
    return res.status(401).json({
      message:"Unauthorized -Invalid User-credentials"
    })
  }
});


module.exports=router;
