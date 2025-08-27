const userModel=require('../models/user.model');
const jwt= require('jsonwebtoken');

async function authUser(req,res,next){
  const {token} = req.cookies ;
  if(!token){
  return  res.status(401).json({
      message:"unauthorized"
    })
  }

  try{
    const decoded=jwt.decode(token,process.env.JWT_SECRET);
    const user=await userModel.findById(decoded.id);
    if(!user){
      return  res.status(401).json({
      message:"unauthorized"
    })
    }
    req.user=user;
    next();
  } catch (error) {
    return  res.status(401).json({
      message:"unauthorized"
    })
  }

}

module.exports={
  authUser
};