import express from "express";
// import FileManager from "../../FileManager.js";
import { isAutoricated } from "../utils/isAdmin.js";
import productContainer from "../../daos/daoProducts.js";


const routerProducts = express.Router();
routerProducts.use(express.urlencoded({ extended: true }));
// const fileManager = new FileManager("./db/productos.json");

const {saveProd,getAllProds,getProdById,updateProductById,deleteProdById,} = new productContainer()

routerProducts.get("/", getAllProds);

routerProducts.get("/:id", getProdById);

routerProducts.post("/",isAutoricated, saveProd);

routerProducts.put("/:id",isAutoricated,updateProductById);

routerProducts.delete("/:id",isAutoricated, deleteProdById);

export default routerProducts;
