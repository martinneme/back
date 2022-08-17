
import express from "express";
import path from 'path';
import routerProducts from './src/routers/routerProducts.js'
import routerCart from './src/routers/routerCart.js'
import { fileURLToPath } from 'url';




const __dirname = fileURLToPath(import.meta.url);
const app = express();
app.use(express.json());
app.use("/api/productos",routerProducts);
app.use("/api/carrito",routerCart);
const PORT = process.env.PORT || 8080;




const listener = app.listen(PORT, () => {
  console.log(`Server escuchando ${listener.address().port}`);
});

listener.on("Error", (error) => console.error(error));
