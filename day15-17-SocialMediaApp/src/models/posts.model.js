const mongoose=require('mongoose');

const postsSchema= new mongoose.Schema(
  {
    image:String,
    title:{},
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"users"
    }
  }
)

const postsModel=mongoose.model("posts",postsSchema);
module.exports=postsModel;