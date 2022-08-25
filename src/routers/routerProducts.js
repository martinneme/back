
const express = require("express");
const dbmethods = require("../../controllers/dbMethods.js");


const routerProducts = express.Router();
routerProducts.use(express.urlencoded({ extended: true }));

const dbProd = new dbmethods("productos");


routerProducts.get("/", async (req, res) => {

    res.sendFile(path.join(__dirname, '../../public/index.hbs'));
  
  });

  routerProducts.get("/products/:id", async (req, res) => {
    try{
         const id = req.params.id;
   const response = await dbProd.getById(id)
  res.send(response);
    }catch (e) {
      console.log(e);
    }
  });

  routerProducts.delete("/products/deleteall", async (req, res) => {
    try{
      const response = await dbProd.deleteAll()
  res.send(response);
    }catch (e) {
      console.log(e);
    }
   
  });


  routerProducts.delete("/products/delete/:id", async (req, res) => {
    try{
      const id = req.params.id;
      const response = await dbProd.deleteById(id)
  res.send(response);
    }catch (e) {
      console.log(e);
    }
   
  });

  routerProducts.put("/products/:id", async (req, res) => {
    try{
      const id = req.params.id;
      const body = req.body;
      const element={
        nombre:body.nombre,
        precio:body.precio,
        url:body.url
      }

      const response = await dbProd.updateById(id,element)
  res.send(response);
    }catch (e) {
      console.log(e);
    }
   
  });




module.exports = routerProducts;