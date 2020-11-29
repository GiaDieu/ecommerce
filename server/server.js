import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter';
import orderRouter from './routers/orderRouter';
// in order to run this import (ES6), install some packages npm install @babel/cli @babel/core  @babel/node @babel/preset-env nodemon --save-dev and create the file .babelrc and set up;

dotenv.config();
const app = express();

//these 2 lines are middleware to get the json data from body (check Postman)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to DB
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// the errors of duplicate of loading API user
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  next();
});

// User Route
app.use('/api/users', userRouter);

// Create Products Route
app.use('/api/products', productRouter);

//Create Order Route
app.use('/api/orders', orderRouter);

//create API PayPal
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
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
