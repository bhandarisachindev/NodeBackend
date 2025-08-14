const express=require('express');
const indexRoutes=require('./routes/index.routes');
const app = express();

app.set("view engine","ejs");  //to view ejs
app.use(express.static('public'));

app.use(express.json());
app.use('/',indexRoutes);

module.exports=app;