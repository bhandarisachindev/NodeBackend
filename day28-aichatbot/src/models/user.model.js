const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
  fullName:{
    firstName:{
      required:true,
      type:String,
    },
    lastName:{
      required:true,
      type:String,
    }
  },
  password:{
    type:String,
  },
  email:{
    required:true,
    type:String,
    unique:true
  }
},
{
  timestamps:true
  }
)

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;