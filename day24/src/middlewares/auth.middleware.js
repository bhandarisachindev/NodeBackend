const jwt=require('jsonwebtoken');
const userModel=require('../models/user.model');

async function authUser(req,res,next) {
  const {token} =req.cookie;

  if(!token){
    return res.status(401).json({
      message:"Unauthorized"
    })
  }

  try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user=await userModel.findOne(decoded.id)
    req.user=user;
    next();
  } catch (error) {
    res.status(401).json({message:"Invalid Session"})
  }
}

module.exports=authUser;