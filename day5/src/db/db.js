const mongoose=require('mongoose');

function connectToDB(){
  mongoose.connect("URILINKHERE")
  .then(()=>{
    console.log("Connected DB successfully.");
  })
}

module.exports=connectToDB;