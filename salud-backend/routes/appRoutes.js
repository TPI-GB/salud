const express = require("express");
// const upload = require("../libs/storage");
// const { addProduct, getProducts } = require('../controllers/productController')
const api = express.Router();

async function getProducts(req, res) {
  res.status(200).send("Hola mundo");
}

api.get("/products", getProducts);

module.exports = api;
