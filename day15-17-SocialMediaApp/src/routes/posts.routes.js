const express=require('express');
const { createPostController } = require('../controller/posts.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');

const upload=multer({storage:multer.memoryStorage()});

const router=express.Router();

router.post('/post',authMiddleware,upload.single("image"),createPostController);


module.exports=router;