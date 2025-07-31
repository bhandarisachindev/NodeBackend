const mongoose = require('mongoose');

function connectToDB(){
  mongoose.connect("URLHERE")
  .then(()=>{
    console.log("Connected DB successfully.");
  })
};

module.exports=connectToDB; 