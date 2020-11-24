import express from "express";
import data from "./data";

// in order to run this import (ES6), install some packages npm install @babel/cli @babel/core  @babel/node @babel/preset-env nodemon --save-dev and create the file .babelrc and set up
const app = express();

app.get("/api/products", async (req, res) => {
  res.send(data);
});
app.get("/", async (req, res) => {
  res.send("Server is Ready!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`);
});
