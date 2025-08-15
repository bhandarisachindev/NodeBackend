const express = require('express');
const { route } = require('./auth.routes');
const userCheckController = require('../controller/usercheck.controller');

const router= express.Router();

router.post('/checkuser',userCheckController);

module.exports=router;