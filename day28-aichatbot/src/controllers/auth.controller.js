const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');

async function postRegisterController(req,res){
  const {fullName:{firstName,lastName},email,password }=req.body;

  const isUserExist=await userModel.findOne({email});

  if(isUserExist){
   return res.status(401).json({message:"user already exists."});
  }
  const hashPassword=await bcrypt.hash(password,10)

  const user=await userModel.create({
    fullName:{firstName,lastName},
    email,
    password:hashPassword
  })


  res.status(200).json({
    message:"user created sucessfully.",
    user:{
      email:user.email,
      fullName:user.fullName,
      _id:user._id
    }
  })
}

async function postLoginController(req,res){

  const {email,password }=req.body;
  const user=await userModel.findOne({email});
  if(!user){
    return res.status(401).json({
      message:"invalid email or password."
    })
  }

  const isValidPass=await bcrypt.compare(password,user.password);
  if(!isValidPass){
    return res.status(401).json({
      message:"invalid email or password."
    })
  }
  const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
  
  res.cookie("token",token);
  res.status(200).json({
    message:"user login succesfully"
  })
}

module.exports=
{
  postRegisterController,
  postLoginController
}