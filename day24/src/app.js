const express=require('express');
const authRoutes=require('./routes/auth.routes');
const checkUser=require('./routes/usercheck.routes');
const indexRoutes=require('./routes/index.routes');
const cookieParser = require('cookie-parser');
const app = express();

app.set("view engine","ejs");  //This tells Express which template engine to use when rendering views.
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/',indexRoutes)
app.use('/auth',authRoutes);
app.use('/',checkUser);


module.exports=app;