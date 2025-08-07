const jwt=require('jsonwebtoken');
const userModel = require('../models/user.model');
require('dotenv').config();

async function authMiddleware(req,res,next){
    const token=req.cookies.token;

  if(!token){
    return res.status(400).json({
      message:"Unauthorized User,Please Login first"
    })
  }

  try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user= await userModel.findOne({
      _id:decoded.id
    })
    req.user=user;
    next();
  } catch (error) {
    return res.status(400).json({
      message:"Invalid Token"
    })
  }
};

module.exports=authMiddleware;