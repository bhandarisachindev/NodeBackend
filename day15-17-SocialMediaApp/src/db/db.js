const mongoose = require('mongoose');
require('dotenv').config();

function connectToDB(){
  mongoose.connect(process.env.DB_URL)
  .then(()=>{
    console.log("Connected to DB Successfully.")
  })
  .catch((err)=>{
    console.log(err);
  })
}

module.exports=connectToDB;