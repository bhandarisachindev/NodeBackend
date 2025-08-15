const userModel = require("../models/user.model");

async function userCheckController(req,res) {
  const {username,email}=req.body;

  const user = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  }).select("username email");
  
  if(user.username){
    res.json({message:"Username is already exists."})
  }
  if(user.email){
    res.json({message:"Email is already registered."})
  }

  res.json({message:"Username Avilabel."})

}

module.exports=userCheckController;