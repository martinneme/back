import FileManager from "./FileManager.js";
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const fileManager = new FileManager("productos.txt");


const __dirname = fileURLToPath(import.meta.url);
const app = express();
app.use(express.json());
const routerProducts = express.Router();
app.use(routerProducts);
const PORT = process.env.PORT || 8080;


const form = {
  title:"titulo",
price:"Precio",
link:"Link",
endpoint:"/productos"
}


routerProducts.use(express.urlencoded({ extended: true }));



app.set('view engine', 'pug');
app.set('views', './views');



routerProducts.get("/", (req, res) => {

  res.render('index',{form})

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
res.render('productget',{response})
});



routerProducts.post("/productos", async (req, res) => {
  let response;
  try {
    const add = req.body;
    response = await fileManager.save(add);
  } catch (e) {
    console.error(e);
  }

  res.redirect('/productos');
});



const listener = app.listen(PORT, () => {
  console.log(`Server escuchando ${listener.address().port}`);
});

listener.on("Error", (error) => console.error(error));
