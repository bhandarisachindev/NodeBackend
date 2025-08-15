const mongoose  = require("mongoose");


function connectTODb(){
  mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.error("DB connection error:", err));
}

module.exports=connectTODb;