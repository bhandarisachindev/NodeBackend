const mongoose= require('mongoose');
require('dotenv').config();

function connectDB(){
  mongoose.connect(process.env.DB_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.log("DB connection error:", err);
  });
}

module.exports= connectDB;