const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
  username:{
    required:true,
    type:String,
    unique:true
  },
  email:{
    required:true,
    type:String,
    unique:true
  },
  password:{
    type:String,
    required:true
  } 
},{
  timestamps:true
  }
)

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;