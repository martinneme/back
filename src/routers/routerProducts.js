import express from "express";
import FileManager from "../../FileManager.js";
import { isAutoricated } from "../utils/isAdmin.js";

const routerProducts = express.Router();
routerProducts.use(express.urlencoded({ extended: true }));
const fileManager = new FileManager("./db/productos.json");

routerProducts.get("/:id", async (req, res) => {
  let response;
  try {
    const id = parseInt(req.params.id);
    if (id) {
      response = await fileManager.getById(id);
      if (response === null) {
        throw new Error("Id no existe");
      }
    } else {
      response = await fileManager.getAll();
    }
  } catch (e) {
    console.error(e);
    res.status(404);
  }
  res.json(response);
});

routerProducts.post("/",isAutoricated, async (req, res) => {
  let response;
  const dateTime = new Date();
  const fecha =
    dateTime.getDate() +
    "-" +
    (dateTime.getMonth() + 1) +
    "-" +
    dateTime.getFullYear();
  const hora =
    dateTime.getHours() +
    ":" +
    dateTime.getMinutes() +
    ":" +
    dateTime.getSeconds();
  try {
    const { nombre, descripcion, codigo, url, precio, stock } = req.body;
    const add = {
      nombre,
      descripcion,
      codigo,
      url,
      precio,
      stock,
      timeStamp: fecha + " " + hora,
    };
    response = await fileManager.save(add);
  } catch (e) {
    console.error(e);
  }

  res.json(response);
});

routerProducts.put("/:id",isAutoricated, async (req, res) => {
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

routerProducts.delete("/:id",isAutoricated, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const allElements = await fileManager.getAll();
    const element = allElements.find((ele) => ele.id === id);
    const index = allElements.indexOf(element);
    if (index != -1) {
      allElements.splice(index, 1);
      fileManager.writeFile(JSON.stringify([...allElements]));
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

routerProducts.get("/download", function (req, res) {
  const file = `./public/Primera Entrega-ecommerce.postman_collection.json`;
  res.download(file); // Set disposition and send it.
});

export default routerProducts;
