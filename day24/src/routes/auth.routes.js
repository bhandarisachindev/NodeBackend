const express = require('express');

const {getRegisterController, 
  postRegiterController,
  postLoginController,
  getLoginController}=require('../controller/auth.controller');

const router = express.Router();

router.route('/register')
  .get(getRegisterController)
  .post(postRegiterController);

router.route('/login')
  .get(getLoginController)
  .post(postLoginController)

module.exports=router;