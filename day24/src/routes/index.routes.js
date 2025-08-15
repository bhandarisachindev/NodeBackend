const express=require('express');
const { getIndexController } = require('../controller/index.controller');

const router = express.Router();

router.route('/')
  .get(getIndexController);


module.exports=router;