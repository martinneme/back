
const express = require("express");

const routerProducts = express.Router();
routerProducts.use(express.urlencoded({ extended: true }));


routerProducts.get("/", async (req, res) => {

    res.sendFile(path.join(__dirname, '../../public/index.hbs'));
  
  });




module.exports = routerProducts;