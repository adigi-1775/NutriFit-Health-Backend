require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

const URI = process.env.ATLAS_URI;
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})



const exerciseRouter = require('./routes/exercise');
const nutritionRouter = require('./routes/nutrition');

app.use('/exercise', exerciseRouter);
app.use('/nutrition', nutritionRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
