import express from "express";
import FileManager from "../../FileManager.js";

const routerCart = express.Router();
routerCart.use(express.urlencoded({ extended: true }));
const CartfileManager = new FileManager("./db/cart.json");
const fileManager = new FileManager("./db/productos.json");

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

routerCart.post("/:id/productos", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productsAdd = req.body;
    const cartAllElements = await CartfileManager.getAll();
    const productsDB = await fileManager.getAll();
    const elementCart = cartAllElements.find((ele) => ele.id === id);

    productsAdd.productos.forEach((idProd) => {
      if (elementCart) {
        const prod = productsDB.find((ele) => ele.id === idProd);
        if (prod) elementCart.productos.push(prod);
      }
    });

    CartfileManager.writeFile(JSON.stringify([...cartAllElements]));
    res.json({
      update: "ok",
      id: req.params.id,
      newProducts: productsAdd,
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


routerCart.delete("/:id/productos/:id_prod", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const idProd = parseInt(req.params.id_prod);
      const cartAllElements = await CartfileManager.getAll();
      const elementCart = cartAllElements.find((ele) => ele.id === id);
      const prod = elementCart.productos.find((ele) => ele.id === idProd);
      const index = elementCart.productos.indexOf(prod);
      if (index != -1) {
        elementCart.productos.splice(index, 1);
        CartfileManager.writeFile(JSON.stringify([...cartAllElements]));
        res.json({
          Delete: "ok",
          idCart: req.params.id,
          ElementDelete: prod,
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
