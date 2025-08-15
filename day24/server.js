require('dotenv').config();
const app = require("./src/app");
const connectTODb = require('./src/db/db');

connectTODb();

app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}`)
});