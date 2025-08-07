const mongoose=require('mongoose');
const postsModel=require('../models/posts.model');
const userModel = require('../models/user.model');
require('dotenv').config();

async function createPostController(req,res){
  const file =req.file;
  
}

module.exports={createPostController};