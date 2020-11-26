import express from 'express';
import mongoose from 'mongoose';
import data from './data';
import userRouter from './routers/userRouter.js';

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
app.get('/api/products', async (req, res) => {
  res.send(data);
});

//Create ProductDetails
app.get('/api/products/:id', async (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: 'Product Not Found!' });
  }
});

//set Up Server
app.get('/', async (req, res) => {
  res.send('Server is Ready!');
});

//Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`);
});
