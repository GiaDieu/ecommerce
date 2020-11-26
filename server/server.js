import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter';
// in order to run this import (ES6), install some packages npm install @babel/cli @babel/core  @babel/node @babel/preset-env nodemon --save-dev and create the file .babelrc and set up
const app = express();

//connect to DB
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// User Route
app.use('/api/users', userRouter);

// the errors of duplicate of loading API user
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// Create Products
app.use('/api/products', productRouter);

//Create ProductDetails

//set Up Server
app.get('/', async (req, res) => {
  res.send('Server is Ready!');
});

//Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`);
});
