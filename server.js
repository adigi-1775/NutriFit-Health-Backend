require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let baseURL;
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:5000';
}
else {
  baseURL = 'https://nutrifit-health-frontend.herokuapp.com';
}

const whitelist = ['http://localhost:3000','https://nutrifit-health-frontend.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

const URI = process.env.ATLAS_URI;
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exerciseRouter = require('./routes/exercise');
const nutritionRouter = require('./routes/nutrition');
const userRouter = require('./routes/user');

app.use('/exercise', exerciseRouter);
app.use('/nutrition', nutritionRouter);
app.use('/user', userRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
