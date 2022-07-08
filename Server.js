import FileManager from "./FileManager.js";
import express from "express";

const fileManager = new FileManager("productos.txt");

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  const welcomeMsj = '<h1 style="color:#0000FF">Bienvenido al server</h1>';
  res.send(welcomeMsj);
});

app.get("/productos", async (req, res) => {
  let response;
  try {
    response = await fileManager.getAll();
  } catch (e) {
    console.error(e);
  }

  res.send(response);
});

app.get("/productosRandom", async (req, res) => {
  let response;
  try {
    let min = 1;
    let max = await fileManager.getLenghtProdArray();

    let id = Math.floor(Math.random() * (max - min + 1) + min);

    response = await fileManager.getById(id);
  } catch (e) {
    console.error(e);
  }
  res.send(response);
});

const listener = app.listen(PORT, () => {
  console.log(`Server escuchando ${listener.address().port}`);
});

listener.on("Error", (error) => console.error(error));
