const express=require('express');
const authMIddleware = require('../middlewares/auth.middleware');
const chatController = require('../controllers/chat.controller');

const router=express.Router();

router.post('/chat',authMIddleware,chatController.createChat);

module.exports=router;