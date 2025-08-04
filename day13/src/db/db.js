const mongoose=require('mongoose');
require('dotenv').config()


 function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB connected succesfully"))
    .catch(error=>console.log("error",error));
 }

module.exports=connectDB;