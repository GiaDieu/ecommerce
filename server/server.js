import express from 'express';
import data from './data';

// in order to run this import (ES6), install some packages npm install @babel/cli @babel/core  @babel/node @babel/preset-env nodemon --save-dev and create the file .babelrc and set up
const app = express();

app.get('/api/products', async (req, res) => {
    res.send(data);
});

app.get('/api/products/:id', async (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ msg: 'Product Not Found!' });
    }
});

app.get('/', async (req, res) => {
    res.send('Server is Ready!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serve at http://localhost:${PORT}`);
});
