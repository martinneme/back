import FileManager from "./FileManager.js";
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from'body-parser';

const fileManager = new FileManager("productos.txt");



const app = express();
app.use(express.json());
const routerProducts = express.Router();
app.use(routerProducts);
const PORT = process.env.PORT || 8080;


routerProducts.use(express.urlencoded({ extended: true }));
routerProducts.use("/",express.static('public'));






routerProducts.get("/", (req, res) => {

  res.sendFile("/public/index.html")

}); 

routerProducts.get("/productadd.html", (req, res) => {

  res.sendFile("/public/productadd.html")

}); 



routerProducts.get("/productos", async (req, res) => {
  let response;
  try {
    response = await fileManager.getAll();
  } catch (e) {
    console.error(e);
    res.status(404)
  }
  res.status(200)
  res.json(response);
});

routerProducts.get("/productos/:id", async (req, res) => {
  
  let response;
  try {
    const id = parseInt(req.params.id);
    response = await fileManager.getById(id);
    if(response === null){
      throw new Error('Id no existe')
    }
  } catch (e) {
    console.error(e);
    res.status(404)
  }
  res.json(response);
});

routerProducts.post("/productosadd", async (req, res) => {
  let response;
  try {
    const add = req.body;
    response = await fileManager.save(add);
  } catch (e) {
    console.error(e);
  }

  res.json(response);
});

routerProducts.put("/productos/update/:id", async (req, res) => {
  let element;
  try {
    const id = parseInt(req.params.id);
    const update = req.body;
    const allElements = await fileManager.getAll();
    element = allElements.find((ele) => ele.id === id);
    if (element) {
      if (update.title && element.title != update.title)
        element["title"] = update.title;
      if (update.price && element.price != update.price)
        element["price"] = update.price;
      if (update.thumbnail && element.thumbnail != update.thumbnail)
        element["thumbnail"] = update.thumbnail;
    }

    fileManager.writeFile(JSON.stringify([...allElements]));
    res.json({
      update: "ok",
      id: req.params.id,
      newElement: element,
    });
  } catch (e) {
    console.error(e);
  }
  console.log(element);
});

routerProducts.get("/productoRandom", async (req, res) => {
  let response;
  try {
    let min = 1;
    let max = await fileManager.getLenghtProdArray();

    let id = Math.floor(Math.random() * (max - min + 1) + min);

    response = await fileManager.getById(id);
  } catch (e) {
    console.error(e);
  }
  res.json(response);
});

routerProducts.delete("/productos/:id", async (req, res) => {
  let response;
  try {
    const id = parseInt(req.params.id);
    const allElements = await fileManager.getAll();
    const element = allElements.find((ele) => ele.id === id);
    const index = allElements.indexOf(element);
    if (index!=-1) {
      allElements.splice(index, 1);
      fileManager.writeFile(JSON.stringify([...allElements]));
      res.json({
        Delete: "ok",
        id: req.params.id,
        ElementDelete: element,
      });
    }else{
      res.json({
        Delete: `Error, ID: ${id} no existe`,
        id: req.params.id,
        ElementDelete: null,
      });
    }
  } catch (e) {
    console.error(e);
  }
});

const listener = app.listen(PORT, () => {
  console.log(`Server escuchando ${listener.address().port}`);
});

listener.on("Error", (error) => console.error(error));
