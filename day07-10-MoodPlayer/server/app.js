const express = require('express');
const connectDB = require('./src/db/db')
const songRoutes=require('./src/routes/song.route');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', songRoutes);

connectDB();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});