const mongoose=require('mongoose');

const postsSchema= new mongoose.Schema(
  {
    image:String,
    caption:String,
    title:{},
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"user"
    }
  }
)

const postsModel=mongoose.model("post",postsSchema);

module.exports=postsModel;  
