const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt=require("bcrypt");
const mongoose= require("mongoose");

function getRegisterController(req,res) {
  res.render("register");
}
function getLoginController(req,res){
  res.render("login");
}

async function postRegiterController(req,res){
  const {username,password,email}=req.body;

  const isUserExists=await userModel.findOne({
    $or:[{username:username},
      {email:email}]
  })

  if(isUserExists){
    return res.status(400).json({
      message:"User already registered."
    })
  }
  const hashPassword=await bcrypt.hash(password,10);

  const user=await userModel.create({
    username,
    password:hashPassword,
    email
  })

  const token =jwt.sign({id:user._id}, process.env.JWT_SECRET)
  res.cookie('token',token);
  return res.status(200).json({
    message:"User created.",
    user
  })
}



async function postLoginController(req,res){
  const {email_username,password}=req.body;
  const user=await userModel.findOne({
    $or:[
      {email:email_username},
      {username:email_username}
    ]
  })

  if(!user){
    res.status(401).json({message:"user not found."})
  }
  
  const isValidPass= bcrypt.compare(password,user.password);

  if(!isValidPass){
    return res.status(401).json({
      message:"Password is incorrect"
    })
  }
  const token =jwt.sign({id:user._id}, process.env.JWT_SECRET)

  res.cookie('token',token);
  return res.status(200).json({
    message:"User Login sucessfully.",
    user
  })
}

module.exports={
  getRegisterController,
  postRegiterController,
  getLoginController,
  postLoginController }