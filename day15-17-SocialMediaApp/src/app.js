const express = require('express');
const authRoutes=require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const postsRoutes = require('./routes/posts.routes');

const app=express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth',authRoutes);
app.use('/',postsRoutes);

module.exports=app;