import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel';
import data from '../data.js';

const productRouter = express.Router();

//create Product
productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProduct = await Product.insertMany(data.products);
    res.send({ createdProduct });
  }),
);

//get all products
productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  }),
);

//find and look up for product with Id
productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found!' });
    }
  }),
);

export default productRouter;
