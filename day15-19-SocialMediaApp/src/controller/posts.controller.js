const mongoose=require('mongoose');
const postsModel=require('../models/posts.model');
const userModel = require('../models/user.model');
const {v4 :uuidv4}=require('uuid');
const generateCaption = require('../services/ai.service');
const imageUpload = require('../services/imagekit.service');


async function createPostController(req,res){
  const file =await req.file;
  const base64Img=new Buffer.from(file.buffer).toString('base64');
  const caption=await generateCaption(base64Img);
  const result =await imageUpload(file.buffer,`${uuidv4()}`)
  const post =await postsModel.create({
    caption:caption,
    image:result.url,
    user:req.user._id
  })

  res.status(200).json({
    message:"post created", 
  })
}

module.exports={createPostController};