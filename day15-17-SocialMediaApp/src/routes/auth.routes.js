const express = require('express');
const { registerController , loginController, checkUserController} = require('../controller/auth.controller');


const router=express.Router();

router.post('/register',registerController);

router.get('/checkuser',checkUserController);

router.post('/login',loginController);

// router.get('/user',)

module.exports=router;