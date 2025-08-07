const app=require('./src/app');
const connectToDB = require('./src/db/db')
require('dotenv').config();

connectToDB();
app.listen(process.env.PORT,()=>{
  console.log(`server is running on port ${process.env.PORT}.`);
});