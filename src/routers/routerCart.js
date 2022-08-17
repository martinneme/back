import express from "express";
import FileManager from "../../FileManager.js";

const routerCart= express.Router();
routerCart.use(express.urlencoded({ extended: true }));
const CartfileManager = new FileManager("./db/cart.json");

routerCart.get("/:id/productos", async (req, res) => {
  let response;
  try {
    const id = parseInt(req.params.id);
      response = await CartfileManager.getById(id);
      if (response === null) {
        throw new Error("Id no existe");
      }
    
  } catch (e) {
    console.error(e);
    res.status(404);
  }

  res.json(response);
});

routerCart.post("/", async (req, res) => {
  let response;
  try {
    const { nombre, descripcion, codigo, url, precio, stock } = req.body;
    const add = {};
    response = await CartfileManager.save(add);
  } catch (e) {
    console.error(e);
  }

  res.json(response);
});

routerCart.put("/:id", async (req, res) => {
  let element;
  try {
    const id = parseInt(req.params.id);
    const update = req.body;
    const allElements = await fileManager.getAll();
    element = allElements.find((ele) => ele.id === id);
    if (element) {
      if (update.nombre && element.nombre != update.nombre)
        element["nombre"] = update.nombre;
      if (update.descripcion && element.descripcion != update.descripcion)
        element["descripcion"] = update.descripcion;
      if (update.codigo && element.codigo != update.codigo)
        element["codigo"] = update.codigo;
      if (update.url && element.url != update.url) element["url"] = update.url;
      if (update.precio && element.precio != update.precio)
        element["precio"] = update.precio;
      if (update.stock && element.stock != update.stock)
        element["stock"] = update.stock;
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

});

routerCart.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const allElements = await CartfileManager.getAll();
    const element = allElements.find((ele) => ele.id === id);
    const index = allElements.indexOf(element);
    if (index != -1) {
      allElements.splice(index, 1);
      CartfileManager.writeFile(JSON.stringify([...allElements]));
      res.json({
        Delete: "ok",
        id: req.params.id,
        ElementDelete: element,
      });
    } else {
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


export default routerCart;