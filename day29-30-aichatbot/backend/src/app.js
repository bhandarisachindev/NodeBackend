const express=require('express');
const cookieParser=require('cookie-parser');
const authRoutes=require('./routes/auth.routes');
const chatRoutes=require('./routes/chat.routes');
const cors = require('cors')
const path = require('path');


const app=express();
app.use(cors({
    origin: "http://localhost:5173",  // frontend URL
    credentials: true,                // allow cookies/auth headers
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


app.use("/auth",authRoutes);
app.use("/api",chatRoutes);

app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports=app;