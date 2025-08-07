const userModel=require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');


async function registerController(req,res){
  const {username,password}=req.body;

  const checkUser=await userModel.findOne({
    username
  })

  if(checkUser){
    return res.status(409).json({
      message:"user already Exists."
    })
  }

  const user=await userModel.create({
    username,
    password: await bcrypt.hash(password,10)
  })

  const token= jwt.sign({id:user._id},process.env.JWT_SECRET);
  res.cookie("token",token);

  res.status(201).json({
    message:"user Created"
  })
}

async function loginController(req,res) {
  const {username,password}=req.body;

  const user=await userModel.findOne({
    username
  });

  if(!user){
    return res.status(400).json({
      message:"user not found."
    })
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch){
    return res.status(400).json({
      message:"Incorrect Password."
    })
  }

  const token= jwt.sign({password:user._id},process.env.JWT_SECRET);
  res.cookie("token",token);

  res.status(201).json({
    message:"Used logged in successfully.",
    user:{
      username:user.username,
      id:user._id
    }
  })
}

async function checkUserController(req,res) {
  const {username}=req.query;

  const user=await userModel.findOne({
    username
  })
  if(user){
    return res.status(409).json({
      message:"user already Exists."
    })
  }else{
    return res.status(200).json({
      message:"username is available."
    })
  }  
}


module.exports={
  registerController,
  checkUserController,
  loginController
}