const express=require('express');

const router=express.Router();

router.get('/',(req,res)=>{
  res.render("index");  //renders /view/index.ejs
})

module.exports=router;